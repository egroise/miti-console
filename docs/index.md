<a name="module_miti-console"></a>

## miti-console

* [miti-console](#module_miti-console)
    * [.startProgress(max)](#module_miti-console.startProgress)
    * [.incrementProgress()](#module_miti-console.incrementProgress)
    * [.stopProgress()](#module_miti-console.stopProgress)
    * [.p(path1, path2)](#module_miti-console.p) ⇒ <code>string</code>
    * [.dir(path, extension)](#module_miti-console.dir) ⇒ <code>Array</code>
    * [.checkDir(path)](#module_miti-console.checkDir) ⇒ <code>boolean</code>
    * [.cleanDir(path)](#module_miti-console.cleanDir)
    * [.targetFileExt(sourceFile, sourcePath, targetPath, sourceExt, targetExt)](#module_miti-console.targetFileExt) ⇒ <code>string</code>
    * [.targetFile(sourceFile, sourcePath, targetPath)](#module_miti-console.targetFile) ⇒ <code>string</code>
    * [.run(cmd)](#module_miti-console.run) ⇒ <code>string</code>
    * [.checkRun(cmd)](#module_miti-console.checkRun) ⇒ <code>boolean</code>

<a name="module_miti-console.startProgress"></a>

### miti-console.startProgress(max)
Starts progress bar.

**Kind**: static method of [<code>miti-console</code>](#module_miti-console)  

| Param | Type | Description |
| --- | --- | --- |
| max | <code>int</code> | Progress max value. |

<a name="module_miti-console.incrementProgress"></a>

### miti-console.incrementProgress()
Increment progress bar.

**Kind**: static method of [<code>miti-console</code>](#module_miti-console)  
<a name="module_miti-console.stopProgress"></a>

### miti-console.stopProgress()
Stop progress bar.

**Kind**: static method of [<code>miti-console</code>](#module_miti-console)  
<a name="module_miti-console.p"></a>

### miti-console.p(path1, path2) ⇒ <code>string</code>
Combines a path with a file name or a sub path.

**Kind**: static method of [<code>miti-console</code>](#module_miti-console)  
**Returns**: <code>string</code> - Combined path.  

| Param | Type | Description |
| --- | --- | --- |
| path1 | <code>string</code> | File path. |
| path2 | <code>string</code> | Sub path or file name. |

<a name="module_miti-console.dir"></a>

### miti-console.dir(path, extension) ⇒ <code>Array</code>
Returns an string array of found files under given path and having given extension.

**Kind**: static method of [<code>miti-console</code>](#module_miti-console)  
**Returns**: <code>Array</code> - String array of found files (full path)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to search |
| extension | <code>string</code> | File extension to filter (empty string means no filter) |

**Example**  
```js
mc = require("miti-console");
files = mc.dir("/images","jpg")
 
```
<a name="module_miti-console.checkDir"></a>

### miti-console.checkDir(path) ⇒ <code>boolean</code>
Checks is path exists, and creates it if it doesn't.

**Kind**: static method of [<code>miti-console</code>](#module_miti-console)  
**Returns**: <code>boolean</code> - Does folder exists.  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to check. |

<a name="module_miti-console.cleanDir"></a>

### miti-console.cleanDir(path)
Deletes all files contained in given directory.

**Kind**: static method of [<code>miti-console</code>](#module_miti-console)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Directory path. |

<a name="module_miti-console.targetFileExt"></a>

### miti-console.targetFileExt(sourceFile, sourcePath, targetPath, sourceExt, targetExt) ⇒ <code>string</code>
Like targetFile but with also changing the extension.

**Kind**: static method of [<code>miti-console</code>](#module_miti-console)  
**Returns**: <code>string</code> - target file path  

| Param | Type | Description |
| --- | --- | --- |
| sourceFile | <code>string</code> | Source file. |
| sourcePath | <code>string</code> | Source root path. |
| targetPath | <code>string</code> | Target root path. |
| sourceExt | <code>string</code> | Source file extension. |
| targetExt | <code>string</code> | Target file extension. |

**Example**  
```js
mc = require("miti-console");
target = mc.targetFile("/images/faces/family/dad.jpg", "/images/faces", "/new_faces", "jpg", "jpeg");
// target == "/new_faces/family/dad.jpeg"
```
<a name="module_miti-console.targetFile"></a>

### miti-console.targetFile(sourceFile, sourcePath, targetPath) ⇒ <code>string</code>
Gives file path of a file moved from sourcePath to targetPath keeping relative tree location. Missing target folders are created.

**Kind**: static method of [<code>miti-console</code>](#module_miti-console)  
**Returns**: <code>string</code> - target file path  

| Param | Type | Description |
| --- | --- | --- |
| sourceFile | <code>string</code> | Source file. |
| sourcePath | <code>string</code> | Source root path. |
| targetPath | <code>String</code> | Target root path. |

**Example**  
```js
mc = require("miti-console");
target = mc.targetFile("/images/faces/family/dad.jpg", "/images/faces", "/new_faces");
// target == "/new_faces/family/dad.jpg"
```
<a name="module_miti-console.run"></a>

### miti-console.run(cmd) ⇒ <code>string</code>
Runs given command and returns output.

**Kind**: static method of [<code>miti-console</code>](#module_miti-console)  
**Returns**: <code>string</code> - Output.  

| Param | Type | Description |
| --- | --- | --- |
| cmd | <code>string</code> | Command to run. |

<a name="module_miti-console.checkRun"></a>

### miti-console.checkRun(cmd) ⇒ <code>boolean</code>
Can this command run correctly ?

**Kind**: static method of [<code>miti-console</code>](#module_miti-console)  
**Returns**: <code>boolean</code> - Did command run correctly ?  

| Param | Type | Description |
| --- | --- | --- |
| cmd | <code>string</code> | Command to run. |

