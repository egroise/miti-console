/**
 * @module miti-console
 **/

const path = require('path');
const fs = require('fs');
const child_process = require('child_process');
const sllog = require("single-line-log").stdout;
const cp = require("cli-progress");

const progress = new cp.SingleBar({
    clearOnComplete: true,
    hideCursor: true
}, cp.Presets.shades_classic);

/**
 * Starts progress bar.
 * @param {int} max - Progress max value. 
 * @alias module:miti-console.startProgress
 */
function startProgress(max) {
    progress.start(max, 0);
}

/**
 * Increment progress bar.
 * @alias module:miti-console.incrementProgress
 */
function incrementProgress() {
    progress.increment();
}

/**
 * Stop progress bar.
 * @alias module:miti-console.stopProgress
 */
function stopProgress() {
    progress.stop();
}

/** 
 * Combines a path with a file name or a sub path.
 * @param {string} path1 - File path.
 * @param {string} path2 - Sub path or file name.
 * @return {string} Combined path.
 * @alias module:miti-console.p
*/
function p(path1, path2) { return path.resolve(path1, path2); }

/**
 * Returns an string array of found files under given path and having given extension.
 * @param {string} path - Path to search
 * @param {string} extension - File extension to filter (empty string means no filter)
 * @return {Array} String array of found files (full path)
 * @example
 * mc = require("miti-console");
 * files = mc.dir("/images","jpg")
 *  @alias module:miti-console.dir
 */
function dir(path, extension) { 
    var files = [];
    fs.readdirSync(path).forEach(file => {
        inProgress();
        var fullpath = p(path, file);
        var stat = fs.statSync(fullpath);
        if (stat && stat.isDirectory()) { 
            /* Recurse into a subdirectory */
            files = files.concat(dir(fullpath, extension));
        } else { 
        if ((extension == "") || (file.endsWith("." + extension))) {
            files.push(fullpath);

        }
    }
  });
  inProgressEnded();
  return files;
}


var inProgressTick = Date.now();
var inProgressPosition = 0;
var inProgressUI = [ "|","/","-","\\","-"];

function inProgress() {
    var now = Date.now();
    if (now - inProgressTick > 500) {
        inProgressTick = now;
        sllog(inProgressUI[inProgressPosition]);
        inProgressPosition += 1;
        if (inProgressPosition == 5) inProgressPosition = 0;
    }
}

function inProgressEnded() {
    sllog.clear();
}

/**
 * Checks is path exists, and creates it if it doesn't.
 * @param {string} path - Path to check.
 * @return {boolean} Does folder exists.
 * @alias module:miti-console.checkDir
 */
function checkDir(path) { if (!fs.existsSync(path)) { fs.mkdirSync(path); return true;} return false; }

/**
 * Deletes all files contained in given directory.
 * @param {string} path - Directory path.
 * @alias module:miti-console.cleanDir
 */
function cleanDir(path) { 
    var files = dir(path, "");
    files.forEach(file => {
        fs.unlinkSync(p(path,file));
    });
}

/**
 * Like targetFile but with also changing the extension.
 * @param {string} sourceFile - Source file.
 * @param {string} sourcePath - Source root path.
 * @param {string} targetPath - Target root path.
 * @param {string} sourceExt - Source file extension.
 * @param {string} targetExt  - Target file extension.
 * @return {string} target file path
 * @alias module:miti-console.targetFileExt
 * @example
 * mc = require("miti-console");
 * target = mc.targetFile("/images/faces/family/dad.jpg", "/images/faces", "/new_faces", "jpg", "jpeg");
 * // target == "/new_faces/family/dad.jpeg"
 */

function targetFileExt(sourceFile, targetPath, rootFolder, sourceExt, targetExt) {
    var bits = sourceFile.split(path.sep);
    var name = bits[bits.length-1];
    var relPath = "";
    var afterCore = false;
    for(var i = 0; i < bits.length-1 ;i++){
        if (bits[i] == rootFolder) afterCore = true;
        else {
            if (afterCore) {
                if (relPath != "") relPath += path.sep;
                relPath += bits[i] ;
                checkDir(p(targetPath, relPath));
            }
        }
    }
    var target = p(targetPath, relPath);
    target = p(target, name);
    return target.replace("."+ sourceExt,"." + targetExt);
}

/**
 * Gives file path of a file moved from sourcePath to targetPath keeping relative tree location. Missing target folders are created.
 * @param {string} sourceFile - Source file.
 * @param {string} sourcePath - Source root path.
 * @param {String} targetPath - Target root path.
 * @return {string} target file path
 * @alias module:miti-console.targetFile
 * @example
 * mc = require("miti-console");
 * target = mc.targetFile("/images/faces/family/dad.jpg", "/images/faces", "/new_faces");
 * // target == "/new_faces/family/dad.jpg"
 */
function targetFile(sourceFile, sourcePath, targetPath) {
    var sp = p(sourcePath, "");
    var tp = p(targetPath,"");
    var sf = p(sourceFile,"");
    var sfp = path.dirname(sf);
    var sfn = path.basename(sf);

    if (!sf.startsWith(sp)) { console.error("targetFile: sourceFile must be under sourcePath"); }
    
    var relPath = sfp.substring(sp.length+1);

    var bits = relPath.split(path.sep);
    var relProgressivePath = "";
    var afterCore = false;
    checkDir(tp);
    for(var i = 0; i < bits.length ;i++){
        if (relProgressivePath != "") relProgressivePath += path.sep;
        relProgressivePath += bits[i] ;
        checkDir(p(tp, relProgressivePath));
    }
    var target = p(tp, relProgressivePath);
    target = p(target, sfn);
    return target;
}

/**
 * Runs given command and returns output.
 * @param {string} cmd - Command to run. 
 * @return {string} Output.
 * @alias module:miti-console.run
 */
function run(cmd) {
    var code = null;
    try {
        return child_process.execSync(cmd).toString();
    } catch (error) {
        var bin = cmd.split(" ")[0]
        console.error("Failed executing ["+bin+ "]");
        return null;
    }
}

function runCmd(...args) {
    var cmd = args[0];
    var path1 = args[1];
    var path2 = args[2];
    try {
        return child_process.spawnSync(cmd, [path1 , path2 ]).output.toString();
    } catch (error) {
        console.error("Failed executing ["+ cmd + "]");
        return null;
    }
}

/**
 * Can this command run correctly ?
 * @param {string} cmd - Command to run.
 * @return {boolean} Did command run correctly ? 
 *  @alias module:miti-console.checkRun
 */
function checkRun(cmd) {
    try {
        child_process.execSync(cmd).toString();
        return true;
    } catch (error) {
        var bin = cmd.split(" ")[0];
        console.error("Failed executing ["+bin+ "]");
        return false;
    } 
}

///////////////////////////////////////////////////////////////////

exports.p = p;
exports.dir = dir;
exports.checkDir = checkDir;
exports.targetFile = targetFile;
exports.targetFileExt = targetFileExt;
exports.run = run;
exports.runCmd = runCmd;
exports.checkRun = checkRun;
exports.progress = progress;
exports.cleanDir = cleanDir;
exports.startProgress = startProgress;
exports.stopProgress = stopProgress;
exports.incrementProgress = incrementProgress;