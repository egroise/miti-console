
const path = require('path')
const fs = require('fs')
const child_process = require('child_process')
const sllog = require("single-line-log").stdout
const cp = require("cli-progress")

const progress = new cp.SingleBar({
    clearOnComplete: true,
    hideCursor: true
}, cp.Presets.shades_classic);

function p(path1, path2) { return path.resolve(path1, path2)}

function dir(path, extension) { 
    var files = []
    fs.readdirSync(path).forEach(file => {
        inProgress()
        var fullpath = p(path, file)
        var stat = fs.statSync(fullpath);
        if (stat && stat.isDirectory()) { 
            /* Recurse into a subdirectory */
            files = files.concat(dir(fullpath, extension))
        } else { 
        if ((extension == "") || (file.endsWith("." + extension))) {
            files.push(fullpath)
        }
    }
  })
  inProgressEnded()
  return files
}

var inProgressTick = Date.now()
var inProgressPosition = 0
var inProgressUI = [ "|","/","-","\\","-"]

function inProgress() {
    var now = Date.now()
    if (now - inProgressTick > 500) {
        inProgressTick = now
        sllog(inProgressUI[inProgressPosition])
        inProgressPosition += 1
        if (inProgressPosition == 5) inProgressPosition = 0
    }
}

function inProgressEnded() {
    sllog.clear
}

function checkDir(path) { if (!fs.existsSync(path)) { fs.mkdirSync(path); return true} return false }

function cleanDir(path) { 
    var files = dir(path, "")
    files.forEach(file => {
        fs.unlinkSync(mc.p(path,file))
    })
}

function targetFile(sourceFile, targetPath, rootFolder, sourceExt, targetExt) {
    var bits = sourceFile.split(path.sep)
    var name = bits[bits.length-1]
    var relPath = ""
    var afterCore = false
    for(var i = 0; i < bits.length-1 ;i++){
        if (bits[i] == rootFolder) afterCore = true
        else {
            if (afterCore) {
                if (relPath != "") relPath += path.sep
                relPath += bits[i] 
                checkDir(p(targetPath, relPath))
            }
        }
    }
    var target = p(targetPath, relPath)
    target = p(target, name)
    return target.replace("."+ sourceExt,"." + targetExt)
}

function run(cmd) {
    var code = null
    try {
        return child_process.execSync(cmd).toString()
    } catch (error) {
        var bin = cmd.split(" ")[0]
        console.error("Failed executing ["+bin+ "]")
        return null
    }
}

function checkRun(cmd) {
    try {
        child_process.execSync(cmd).toString()
        return true
    } catch (error) {
        var bin = cmd.split(" ")[0]
        console.error("Failed executing ["+bin+ "]")
        return false
    } 
}

///////////////////////////////////////////////////////////////////

exports.p = p
exports.dir = dir
exports.checkDir = checkDir
exports.targetFile = targetFile
exports.run = run
exports.checkRun = checkRun
exports.progress = progress
exports.cleanDir = cleanDir