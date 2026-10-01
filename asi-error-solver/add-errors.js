const Database = require("better-sqlite3");

const db = new Database("./data/asi.db");

const errors = [
  // ───────────── Your original 5 records ─────────────
  {
    error_code: "ASI-JS-0004",
    error_title: "Cannot read properties of undefined",
    error_message: "TypeError: Cannot read properties of undefined (reading 'map')",
    error_type: "TypeError",
    technology: "JavaScript",
    root_cause: "The code is calling the map() method on a variable that is undefined.",
    solution: "Ensure the variable contains an array before calling map().",
    solution_steps: [
      "Locate the variable that is causing the error.",
      "Check whether the variable is initialized.",
      "Use an empty array as a fallback if appropriate.",
      "Run the code again and verify the result."
    ],
    verification: "Confirm that the variable is an array before calling map().",
    tags: "javascript, typeerror, undefined, map, array",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0005",
    error_title: "Assignment to constant variable",
    error_message: "TypeError: Assignment to constant variable.",
    error_type: "TypeError",
    technology: "JavaScript",
    root_cause: "A variable declared with const is being reassigned.",
    solution: "Use let if the variable needs to be reassigned, or avoid reassignment.",
    solution_steps: [
      "Find the const declaration.",
      "Find the line where the variable is reassigned.",
      "Change const to let if reassignment is required.",
      "Run the code and verify the fix."
    ],
    verification: "Confirm that the variable is no longer reassigned while declared with const.",
    tags: "javascript, typeerror, const, let, assignment",
    status: "verified"
  },
  {
    error_code: "ASI-NPM-0002",
    error_title: "Module not found",
    error_message: "Error: Cannot find module",
    error_type: "ModuleNotFoundError",
    technology: "Node.js",
    root_cause: "The requested module may be missing, incorrectly named, or unavailable at the specified path.",
    solution: "Verify the module name and installation, then check the import path.",
    solution_steps: [
      "Read the complete error message to identify the missing module.",
      "Check whether the module is installed.",
      "Install the dependency if it is missing.",
      "Verify the import path and file name.",
      "Restart the application and test again."
    ],
    verification: "Confirm that Node.js can resolve the module and the application starts successfully.",
    tags: "nodejs, npm, module, dependency, import",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0006",
    error_title: "Unexpected token",
    error_message: "SyntaxError: Unexpected token",
    error_type: "SyntaxError",
    technology: "JavaScript",
    root_cause: "The JavaScript parser encountered a token that is invalid in the current code context.",
    solution: "Inspect the reported line for incorrect syntax, missing punctuation, or mismatched brackets.",
    solution_steps: [
      "Read the line and position shown in the error.",
      "Check brackets, parentheses, and quotation marks.",
      "Check commas and other punctuation.",
      "Correct the syntax and run the code again."
    ],
    verification: "Confirm that the file parses without a SyntaxError.",
    tags: "javascript, syntaxerror, syntax, unexpected-token",
    status: "verified"
  },
  {
    error_code: "ASI-HTTP-0001",
    error_title: "Failed to fetch",
    error_message: "TypeError: Failed to fetch",
    error_type: "NetworkError",
    technology: "JavaScript Fetch API",
    root_cause: "The browser could not complete the network request. Possible causes include connectivity issues, an incorrect URL, server unavailability, or CORS restrictions.",
    solution: "Check the request URL, server availability, network connection, and browser console for CORS errors.",
    solution_steps: [
      "Check the request URL and HTTP method.",
      "Confirm that the server is running and reachable.",
      "Inspect the browser Network tab for request details.",
      "Check whether the server's CORS configuration allows the request origin.",
      "Retry the request after correcting the issue."
    ],
    verification: "Confirm that the request completes successfully and the expected response is received.",
    tags: "javascript, fetch, network, cors, api",
    status: "verified"
  },

  // ───────────── JavaScript ─────────────
  {
    error_code: "ASI-JS-0007",
    error_title: "Value is not a function",
    error_message: "TypeError: x is not a function",
    error_type: "TypeError",
    technology: "JavaScript",
    root_cause: "The code is trying to call something that is not a function, often because of a typo, a wrong import, or a variable that was overwritten.",
    solution: "Confirm the value is a function before calling it and fix the name or import.",
    solution_steps: [
      "Identify the exact name shown in the error.",
      "Log the value with console.log(typeof x) to see what it really is.",
      "Check for typos, wrong default versus named imports, or shadowed variables.",
      "Correct the reference and run the code again."
    ],
    verification: "Confirm typeof x returns 'function' and the call runs without a TypeError.",
    tags: "javascript, typeerror, function, import, call",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0008",
    error_title: "Cannot read properties of null",
    error_message: "TypeError: Cannot read properties of null (reading 'addEventListener')",
    error_type: "TypeError",
    technology: "JavaScript",
    root_cause: "A property is being accessed on null, commonly because document.getElementById or querySelector found no element, or the script ran before the DOM loaded.",
    solution: "Make sure the element exists and the script runs after the DOM is ready.",
    solution_steps: [
      "Check that the id or selector matches an element in the HTML.",
      "Move the script tag to the end of body or add the defer attribute.",
      "Add a null check before using the element.",
      "Reload the page and test again."
    ],
    verification: "Confirm the element is found (not null) and the code runs without errors in the console.",
    tags: "javascript, typeerror, null, dom, getelementbyid, queryselector",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0009",
    error_title: "Cannot set properties of undefined",
    error_message: "TypeError: Cannot set properties of undefined (setting 'name')",
    error_type: "TypeError",
    technology: "JavaScript",
    root_cause: "The code assigns a property to an object that has not been created yet.",
    solution: "Initialize the parent object before assigning to its properties.",
    solution_steps: [
      "Find the object on the left side of the assignment.",
      "Check where and when it is created.",
      "Initialize it, for example obj = obj || {}, before setting properties.",
      "Run the code again."
    ],
    verification: "Confirm the parent object is defined and the assignment succeeds.",
    tags: "javascript, typeerror, undefined, set, property, object",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0010",
    error_title: "Value is not iterable",
    error_message: "TypeError: x is not iterable",
    error_type: "TypeError",
    technology: "JavaScript",
    root_cause: "Spread, destructuring, for...of, or Promise.all was used on a value that is not an array or other iterable, such as an object, undefined, or null.",
    solution: "Pass an iterable such as an array, or convert the value first.",
    solution_steps: [
      "Log the value to see its actual type.",
      "If it is an object, use Object.keys, Object.values, or Object.entries.",
      "Provide a fallback such as value ?? [] when it may be undefined.",
      "Run the code again."
    ],
    verification: "Confirm the value is an array or iterable and the loop or spread works.",
    tags: "javascript, typeerror, iterable, spread, destructuring, for-of",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0011",
    error_title: "Maximum call stack size exceeded",
    error_message: "RangeError: Maximum call stack size exceeded",
    error_type: "RangeError",
    technology: "JavaScript",
    root_cause: "A function keeps calling itself, directly or indirectly, without a working stop condition, so the call stack overflows.",
    solution: "Add or fix the base case of the recursion, or replace it with a loop.",
    solution_steps: [
      "Read the stack trace to find the repeating function calls.",
      "Check that the recursive function has a base case that is reachable.",
      "Check getters, setters, and toString methods that may call themselves.",
      "Convert deep recursion to iteration if needed."
    ],
    verification: "Confirm the function finishes without a RangeError for the same input.",
    tags: "javascript, rangeerror, recursion, stack, infinite",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0012",
    error_title: "Unexpected end of JSON input",
    error_message: "SyntaxError: Unexpected end of JSON input",
    error_type: "SyntaxError",
    technology: "JavaScript",
    root_cause: "JSON.parse or response.json() received an empty or truncated string.",
    solution: "Verify the data is complete and valid JSON before parsing it.",
    solution_steps: [
      "Log the raw text before parsing.",
      "Check that the server actually returns a body and the right status code.",
      "Handle empty responses, such as 204 No Content, separately.",
      "Wrap parsing in try/catch to handle bad data."
    ],
    verification: "Confirm the raw text is valid JSON and parsing succeeds.",
    tags: "javascript, json, parse, syntaxerror, empty, response",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0013",
    error_title: "Unexpected token '<' in JSON",
    error_message: "SyntaxError: Unexpected token '<', \"<!DOCTYPE \"... is not valid JSON",
    error_type: "SyntaxError",
    technology: "JavaScript",
    root_cause: "The code expected JSON but the server returned an HTML page, often a 404 or error page caused by a wrong URL or route.",
    solution: "Fix the request URL or server route so it returns JSON.",
    solution_steps: [
      "Open the Network tab and inspect the response of the failing request.",
      "Check the URL, including the /api prefix and the port.",
      "Confirm the server route exists and sends JSON.",
      "Check response.ok and the Content-Type header before calling response.json()."
    ],
    verification: "Confirm the response Content-Type is application/json and parsing succeeds.",
    tags: "javascript, json, html, doctype, fetch, api, 404",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0014",
    error_title: "Identifier has already been declared",
    error_message: "SyntaxError: Identifier 'name' has already been declared",
    error_type: "SyntaxError",
    technology: "JavaScript",
    root_cause: "The same name is declared twice with let or const in the same scope, or two scripts declare the same global.",
    solution: "Rename one variable, remove the duplicate declaration, or scope them separately.",
    solution_steps: [
      "Search the file for the duplicated identifier.",
      "Remove the second declaration or rename it.",
      "If two script files are involved, wrap code in a module or function scope.",
      "Reload and test."
    ],
    verification: "Confirm the script loads without a SyntaxError.",
    tags: "javascript, syntaxerror, let, const, redeclare, scope",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0015",
    error_title: "Cannot access variable before initialization",
    error_message: "ReferenceError: Cannot access 'x' before initialization",
    error_type: "ReferenceError",
    technology: "JavaScript",
    root_cause: "A let or const variable is used before its declaration line runs (the temporal dead zone).",
    solution: "Declare and assign the variable before using it.",
    solution_steps: [
      "Find the declaration of the variable.",
      "Move it above the first line that uses it.",
      "Check circular imports that may load a module before its exports exist.",
      "Run the code again."
    ],
    verification: "Confirm the variable is defined before it is read and no ReferenceError appears.",
    tags: "javascript, referenceerror, tdz, let, const, hoisting",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0016",
    error_title: "Invalid array length",
    error_message: "RangeError: Invalid array length",
    error_type: "RangeError",
    technology: "JavaScript",
    root_cause: "An array was created or its length set to a negative, fractional, NaN, or too-large number.",
    solution: "Validate the length so it is a non-negative integer within limits.",
    solution_steps: [
      "Log the value used for the array length.",
      "Check for NaN, undefined, or negative results from calculations.",
      "Use Math.max and Math.floor to normalize the number.",
      "Run the code again."
    ],
    verification: "Confirm the length is a valid non-negative integer and the array is created.",
    tags: "javascript, rangeerror, array, length, nan",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0017",
    error_title: "Value is not a constructor",
    error_message: "TypeError: x is not a constructor",
    error_type: "TypeError",
    technology: "JavaScript",
    root_cause: "The new keyword is used on something that cannot be constructed, such as an arrow function, a plain object, or an incorrectly imported class.",
    solution: "Use new only with classes or regular constructor functions and fix the import.",
    solution_steps: [
      "Check what x actually is with console.log(typeof x).",
      "Make sure arrow functions are not used as constructors.",
      "Check default versus named import syntax.",
      "Run the code again."
    ],
    verification: "Confirm new x() creates an instance without throwing.",
    tags: "javascript, typeerror, constructor, new, class, import",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0018",
    error_title: "await used outside an async function",
    error_message: "SyntaxError: await is only valid in async functions and the top level bodies of modules",
    error_type: "SyntaxError",
    technology: "JavaScript",
    root_cause: "The await keyword is used inside a function that is not marked async, or at top level in a non-module script.",
    solution: "Mark the enclosing function async, or run the script as an ES module.",
    solution_steps: [
      "Find the function that contains the await.",
      "Add the async keyword to that function.",
      "For top-level await, use type=\"module\" in the browser or .mjs / \"type\": \"module\" in Node.js.",
      "Run the code again."
    ],
    verification: "Confirm the file parses and the awaited value resolves correctly.",
    tags: "javascript, await, async, syntaxerror, promise, module",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0019",
    error_title: "Cannot use import statement outside a module",
    error_message: "SyntaxError: Cannot use import statement outside a module",
    error_type: "SyntaxError",
    technology: "JavaScript",
    root_cause: "ES module import syntax is used in a file that the browser or Node.js treats as a classic script.",
    solution: "Declare the file as an ES module, or use require() for CommonJS.",
    solution_steps: [
      "In the browser, load the script with <script type=\"module\">.",
      "In Node.js, add \"type\": \"module\" to package.json or rename the file to .mjs.",
      "Or switch to const x = require('x') if you want CommonJS.",
      "Run the code again."
    ],
    verification: "Confirm the import statement runs without a SyntaxError.",
    tags: "javascript, import, module, esm, commonjs, syntaxerror",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0020",
    error_title: "Converting circular structure to JSON",
    error_message: "TypeError: Converting circular structure to JSON",
    error_type: "TypeError",
    technology: "JavaScript",
    root_cause: "JSON.stringify was given an object that references itself, directly or through nested objects.",
    solution: "Remove the circular reference or serialize only the needed fields.",
    solution_steps: [
      "Read the error path to find where the cycle occurs.",
      "Pick only the plain data fields you need before stringifying.",
      "Or use a replacer function that skips already-seen objects.",
      "Run the code again."
    ],
    verification: "Confirm JSON.stringify returns a string without throwing.",
    tags: "javascript, json, stringify, circular, typeerror",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0021",
    error_title: "Missing initializer in const declaration",
    error_message: "SyntaxError: Missing initializer in const declaration",
    error_type: "SyntaxError",
    technology: "JavaScript",
    root_cause: "A const variable was declared without a value, but const requires one at declaration.",
    solution: "Assign a value at declaration, or use let if it will be assigned later.",
    solution_steps: [
      "Find the const declaration named in the error.",
      "Add an initial value, for example const x = 0;.",
      "Use let instead if the value is assigned later.",
      "Run the code again."
    ],
    verification: "Confirm the file parses without a SyntaxError.",
    tags: "javascript, const, initializer, syntaxerror, declaration",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0022",
    error_title: "Unexpected identifier",
    error_message: "SyntaxError: Unexpected identifier",
    error_type: "SyntaxError",
    technology: "JavaScript",
    root_cause: "A name appears where the parser does not expect one, often caused by a missing comma, operator, or quotation mark on the line before.",
    solution: "Inspect the reported line and the line above it for missing punctuation.",
    solution_steps: [
      "Look at the line number and the previous line in the error.",
      "Check for missing commas between object properties or array items.",
      "Check for unclosed strings or template literals.",
      "Fix the syntax and run again."
    ],
    verification: "Confirm the file parses and runs without a SyntaxError.",
    tags: "javascript, syntaxerror, identifier, comma, syntax",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0023",
    error_title: "Invalid regular expression",
    error_message: "SyntaxError: Invalid regular expression: /(/: Unterminated group",
    error_type: "SyntaxError",
    technology: "JavaScript",
    root_cause: "The regular expression contains invalid syntax, such as an unclosed group or an unescaped special character.",
    solution: "Fix the pattern and escape special characters that should be treated literally.",
    solution_steps: [
      "Read the message to see which part of the pattern is invalid.",
      "Escape characters such as ( ) [ ] { } . * + ? with a backslash when used literally.",
      "If the pattern comes from user input, escape it before passing to new RegExp().",
      "Test the pattern again."
    ],
    verification: "Confirm the regular expression compiles and matches the expected text.",
    tags: "javascript, regex, regexp, syntaxerror, pattern",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0024",
    error_title: "toFixed digits argument out of range",
    error_message: "RangeError: toFixed() digits argument must be between 0 and 100",
    error_type: "RangeError",
    technology: "JavaScript",
    root_cause: "toFixed was called with a negative, undefined-derived, or too-large digits value.",
    solution: "Pass an integer between 0 and 100.",
    solution_steps: [
      "Log the value passed to toFixed.",
      "Make sure it is a number and not NaN or undefined.",
      "Clamp it with Math.min and Math.max if it is calculated.",
      "Run the code again."
    ],
    verification: "Confirm toFixed returns a formatted string without throwing.",
    tags: "javascript, rangeerror, tofixed, number, format",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0025",
    error_title: "Uncaught (in promise)",
    error_message: "Uncaught (in promise) Error",
    error_type: "PromiseRejection",
    technology: "JavaScript",
    root_cause: "A Promise was rejected and no catch handler or try/catch around await handled the failure.",
    solution: "Handle the rejection with .catch() or try/catch around await.",
    solution_steps: [
      "Expand the error in the console to see the original message and stack.",
      "Add .catch() to the promise chain or use try/catch inside the async function.",
      "Fix the underlying failure, such as a failed request.",
      "Run the code again."
    ],
    verification: "Confirm no unhandled rejection appears in the console.",
    tags: "javascript, promise, async, await, unhandled, rejection",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0026",
    error_title: "Cannot destructure property of undefined",
    error_message: "TypeError: Cannot destructure property 'name' of 'undefined' as it is undefined.",
    error_type: "TypeError",
    technology: "JavaScript",
    root_cause: "Destructuring is applied to a value that is undefined or null, such as a missing function argument or an empty API response.",
    solution: "Provide a default value or check the value before destructuring.",
    solution_steps: [
      "Find the destructuring statement or function parameter.",
      "Log the value being destructured.",
      "Add a default, for example function f({ name } = {}) or const { name } = data ?? {}.",
      "Run the code again."
    ],
    verification: "Confirm the destructuring runs without a TypeError.",
    tags: "javascript, typeerror, destructure, undefined, props",
    status: "verified"
  },

  // ───────────── Node.js / npm / Express / env ─────────────
  {
    error_code: "ASI-NPM-0003",
    error_title: "Port already in use",
    error_message: "Error: listen EADDRINUSE: address already in use :::3000",
    error_type: "SystemError",
    technology: "Node.js",
    root_cause: "Another process is already listening on the port your server is trying to use.",
    solution: "Stop the other process or start your server on a different port.",
    solution_steps: [
      "Find the process using the port (lsof -i :3000 on macOS/Linux, netstat -ano | findstr :3000 on Windows).",
      "Stop that process (kill <PID> or taskkill /PID <PID> /F).",
      "Or change your app to use another port, for example through process.env.PORT.",
      "Start the server again."
    ],
    verification: "Confirm the server starts and logs that it is listening.",
    tags: "nodejs, eaddrinuse, port, server, express, listen",
    status: "verified"
  },
  {
    error_code: "ASI-NPM-0004",
    error_title: "package.json not found",
    error_message: "npm ERR! enoent ENOENT: no such file or directory, open '/path/package.json'",
    error_type: "FileNotFoundError",
    technology: "npm",
    root_cause: "npm was run in a folder that does not contain a package.json file.",
    solution: "Run the command in the project root, or create a package.json.",
    solution_steps: [
      "Check your current folder with pwd (or cd on Windows).",
      "Move into the folder that contains package.json.",
      "If the project is new, run npm init -y.",
      "Run the npm command again."
    ],
    verification: "Confirm npm runs without an ENOENT error.",
    tags: "npm, enoent, package.json, directory, init",
    status: "verified"
  },
  {
    error_code: "ASI-NPM-0005",
    error_title: "Unable to resolve dependency tree",
    error_message: "npm ERR! code ERESOLVE npm ERR! ERESOLVE unable to resolve dependency tree",
    error_type: "DependencyError",
    technology: "npm",
    root_cause: "Two packages require conflicting versions of the same peer dependency.",
    solution: "Align the package versions, or install with --legacy-peer-deps as a workaround.",
    solution_steps: [
      "Read the message to see which packages conflict.",
      "Upgrade or downgrade one of them so the peer versions match.",
      "If you must proceed, run npm install --legacy-peer-deps.",
      "Check that the app still builds."
    ],
    verification: "Confirm npm install completes and the project builds.",
    tags: "npm, eresolve, peer, dependency, install, legacy-peer-deps",
    status: "verified"
  },
  {
    error_code: "ASI-NPM-0006",
    error_title: "Permission denied during npm install",
    error_message: "npm ERR! code EACCES npm ERR! syscall access npm ERR! Error: EACCES: permission denied",
    error_type: "PermissionError",
    technology: "npm",
    root_cause: "npm does not have permission to write to the global or project directory, often because it was installed with sudo.",
    solution: "Fix folder ownership or change npm's global directory instead of using sudo.",
    solution_steps: [
      "Check which directory is named in the error.",
      "Change ownership of the folder to your user (for example sudo chown -R $(whoami) <folder>).",
      "For global installs, set a user-owned prefix with npm config set prefix or use a version manager like nvm.",
      "Run the install again."
    ],
    verification: "Confirm the install finishes without an EACCES error.",
    tags: "npm, eacces, permission, sudo, global, install",
    status: "verified"
  },
  {
    error_code: "ASI-NPM-0007",
    error_title: "ES module not found",
    error_message: "Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/path/file' imported from /path/app.js",
    error_type: "ModuleNotFoundError",
    technology: "Node.js",
    root_cause: "In ES modules, relative imports need the full file extension and a correct path, or the package is not installed.",
    solution: "Add the file extension to relative imports and verify the path or package.",
    solution_steps: [
      "Check the path in the error message.",
      "Add .js to relative imports, for example import x from './utils.js'.",
      "Check the file name capitalization.",
      "Install the package if it is an external dependency."
    ],
    verification: "Confirm Node.js resolves the import and the app starts.",
    tags: "nodejs, esm, err_module_not_found, import, extension",
    status: "verified"
  },
  {
    error_code: "ASI-NPM-0008",
    error_title: "require is not defined in ES module scope",
    error_message: "ReferenceError: require is not defined in ES module scope, you can use import instead",
    error_type: "ReferenceError",
    technology: "Node.js",
    root_cause: "The project is set to ES modules (\"type\": \"module\" or .mjs), where require() is not available.",
    solution: "Use import syntax, or switch the file back to CommonJS.",
    solution_steps: [
      "Check package.json for \"type\": \"module\".",
      "Replace require with import statements.",
      "Or rename the file to .cjs to keep using require.",
      "Run the app again."
    ],
    verification: "Confirm the file runs without a ReferenceError.",
    tags: "nodejs, require, esm, commonjs, module, referenceerror",
    status: "verified"
  },
  {
    error_code: "ASI-NPM-0009",
    error_title: "require() of ES Module not supported",
    error_message: "Error [ERR_REQUIRE_ESM]: require() of ES Module not supported",
    error_type: "ModuleError",
    technology: "Node.js",
    root_cause: "A CommonJS file tries to require() a package that only ships as an ES module.",
    solution: "Use dynamic import(), convert your project to ES modules, or use an older CommonJS version of the package.",
    solution_steps: [
      "Identify the package named in the error.",
      "Use await import('package') inside an async function, or convert your file to ESM.",
      "Alternatively install an earlier version that supports require().",
      "Run the app again."
    ],
    verification: "Confirm the package loads and the app starts.",
    tags: "nodejs, err_require_esm, esm, commonjs, require, import",
    status: "verified"
  },
  {
    error_code: "ASI-NPM-0010",
    error_title: "JavaScript heap out of memory",
    error_message: "FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory",
    error_type: "MemoryError",
    technology: "Node.js",
    root_cause: "The Node.js process used more memory than its default heap limit, often during large builds or because of a memory leak.",
    solution: "Increase the memory limit temporarily and find what is consuming memory.",
    solution_steps: [
      "Run the command with more memory, for example NODE_OPTIONS=--max-old-space-size=4096.",
      "Check for infinite loops or data that grows without limit.",
      "Process large files or datasets in chunks or streams.",
      "Run the build or app again."
    ],
    verification: "Confirm the process completes without a heap error.",
    tags: "nodejs, memory, heap, out-of-memory, build, max-old-space-size",
    status: "verified"
  },
  {
    error_code: "ASI-NPM-0011",
    error_title: "npm script failed (ELIFECYCLE)",
    error_message: "npm ERR! code ELIFECYCLE npm ERR! errno 1",
    error_type: "ScriptError",
    technology: "npm",
    root_cause: "A script in package.json exited with an error. ELIFECYCLE only reports the failure; the real cause is printed above it.",
    solution: "Scroll up to read the first error message and fix that underlying problem.",
    solution_steps: [
      "Read the log above the ELIFECYCLE lines.",
      "Fix the specific error, such as a build, test, or syntax failure.",
      "If dependencies look broken, delete node_modules and package-lock.json, then run npm install.",
      "Run the script again."
    ],
    verification: "Confirm the npm script exits with code 0.",
    tags: "npm, elifecycle, script, build, errno, package.json",
    status: "verified"
  },
  {
    error_code: "ASI-NPM-0012",
    error_title: "npm network timeout or connection reset",
    error_message: "npm ERR! code ECONNRESET npm ERR! network request failed / ETIMEDOUT",
    error_type: "NetworkError",
    technology: "npm",
    root_cause: "npm could not reach the registry because of an unstable connection, a proxy, a firewall, or a registry outage.",
    solution: "Check your connection and proxy settings, then retry the install.",
    solution_steps: [
      "Check that you can open https://registry.npmjs.org in a browser.",
      "Check proxy settings with npm config get proxy and npm config get https-proxy.",
      "Retry the install, or run npm cache verify.",
      "Try a different network if the problem continues."
    ],
    verification: "Confirm npm install downloads packages successfully.",
    tags: "npm, econnreset, etimedout, network, registry, proxy",
    status: "verified"
  },
  {
    error_code: "ASI-NPM-0013",
    error_title: "Integrity checksum failed",
    error_message: "npm ERR! code EINTEGRITY npm ERR! sha512 integrity checksum failed",
    error_type: "IntegrityError",
    technology: "npm",
    root_cause: "The downloaded package does not match the hash in package-lock.json, often because of a corrupted cache or an edited lock file.",
    solution: "Clear the npm cache and reinstall dependencies.",
    solution_steps: [
      "Run npm cache clean --force.",
      "Delete node_modules and package-lock.json.",
      "Run npm install again.",
      "Commit the regenerated lock file."
    ],
    verification: "Confirm npm install completes without an integrity error.",
    tags: "npm, eintegrity, checksum, cache, lock, install",
    status: "verified"
  },
  {
    error_code: "ASI-NPM-0014",
    error_title: "node-gyp rebuild failed",
    error_message: "gyp ERR! build error gyp ERR! stack Error: `make` failed with exit code: 2",
    error_type: "BuildError",
    technology: "Node.js",
    root_cause: "A native module needs to be compiled, but the required build tools such as Python or a C++ compiler are missing or incompatible.",
    solution: "Install the build tools for your operating system, or use a version with prebuilt binaries.",
    solution_steps: [
      "Read the gyp output to see which tool or file is missing.",
      "Install Python 3 and a C++ toolchain (build-essential on Linux, Xcode Command Line Tools on macOS, Visual Studio Build Tools on Windows).",
      "Use a Node.js version supported by the package.",
      "Run npm install again."
    ],
    verification: "Confirm the native module installs and loads without errors.",
    tags: "nodejs, node-gyp, native, build, python, compiler, better-sqlite3",
    status: "verified"
  },
  {
    error_code: "ASI-NPM-0015",
    error_title: "'node' or 'npm' is not recognized",
    error_message: "'node' is not recognized as an internal or external command, operable program or batch file.",
    error_type: "EnvironmentError",
    technology: "Node.js",
    root_cause: "Node.js is not installed, or its folder is not in the system PATH.",
    solution: "Install Node.js and make sure it is added to PATH.",
    solution_steps: [
      "Download and install the LTS version from nodejs.org.",
      "Enable the option to add Node.js to PATH during installation.",
      "Close and reopen the terminal.",
      "Run node -v and npm -v."
    ],
    verification: "Confirm node -v and npm -v print version numbers.",
    tags: "nodejs, npm, path, not-recognized, install, windows",
    status: "verified"
  },
  {
    error_code: "ASI-NPM-0016",
    error_title: "System limit for file watchers reached",
    error_message: "Error: ENOSPC: System limit for number of file watchers reached",
    error_type: "SystemError",
    technology: "Node.js",
    root_cause: "Linux has a limit on how many files can be watched, and the dev server or bundler exceeded it.",
    solution: "Increase the inotify watcher limit.",
    solution_steps: [
      "Run: echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf.",
      "Apply it with sudo sysctl -p.",
      "Restart the dev server.",
      "Exclude node_modules from watching if possible."
    ],
    verification: "Confirm the dev server starts without an ENOSPC error.",
    tags: "nodejs, enospc, inotify, watchers, linux, dev-server",
    status: "verified"
  },
  {
    error_code: "ASI-NPM-0017",
    error_title: "Package not found in registry",
    error_message: "npm ERR! code E404 npm ERR! 404 Not Found - GET https://registry.npmjs.org/package-name",
    error_type: "NotFoundError",
    technology: "npm",
    root_cause: "The package name is misspelled, does not exist, or is private and requires authentication.",
    solution: "Check the package name and registry configuration.",
    solution_steps: [
      "Search for the package on npmjs.com to confirm the exact name.",
      "Fix any typo in the install command or package.json.",
      "For private packages, log in with npm login or configure the .npmrc token.",
      "Run npm install again."
    ],
    verification: "Confirm the package installs and appears in node_modules.",
    tags: "npm, e404, not-found, registry, package, private",
    status: "verified"
  },
  {
    error_code: "ASI-EXP-0001",
    error_title: "Cannot set headers after they are sent",
    error_message: "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client",
    error_type: "HTTPError",
    technology: "Express.js",
    root_cause: "The route handler sends more than one response for the same request.",
    solution: "Ensure each request path sends exactly one response, and return after sending.",
    solution_steps: [
      "Find the route handler named in the stack trace.",
      "Look for multiple res.send, res.json, or res.redirect calls.",
      "Add return before a response inside conditions, for example return res.status(400).json(...).",
      "Restart the server and test again."
    ],
    verification: "Confirm the endpoint responds once without the error in the console.",
    tags: "express, nodejs, headers, response, res.send, err_http_headers_sent",
    status: "verified"
  },
  {
    error_code: "ASI-EXP-0002",
    error_title: "Cannot GET route",
    error_message: "Cannot GET /",
    error_type: "RoutingError",
    technology: "Express.js",
    root_cause: "The server has no route or static file handler for the requested path and method.",
    solution: "Define the route or serve your static files.",
    solution_steps: [
      "Check the URL and HTTP method you are requesting.",
      "Add a handler such as app.get('/', ...) or app.use(express.static('public')).",
      "Make sure the route is registered before any catch-all handler.",
      "Restart the server."
    ],
    verification: "Confirm the URL returns the expected page or JSON.",
    tags: "express, nodejs, routing, cannot-get, static, 404",
    status: "verified"
  },
  {
    error_code: "ASI-EXP-0003",
    error_title: "req.body is undefined",
    error_message: "TypeError: Cannot destructure property 'x' of 'req.body' as it is undefined.",
    error_type: "TypeError",
    technology: "Express.js",
    root_cause: "No body-parsing middleware is set up, or the client is not sending a matching Content-Type.",
    solution: "Add express.json() middleware before your routes and send the correct header.",
    solution_steps: [
      "Add app.use(express.json()) before your route definitions.",
      "For form data, also add app.use(express.urlencoded({ extended: true })).",
      "Send the request with Content-Type: application/json.",
      "Restart the server and test again."
    ],
    verification: "Confirm console.log(req.body) prints the submitted data.",
    tags: "express, nodejs, req.body, json, middleware, body-parser",
    status: "verified"
  },
  {
    error_code: "ASI-ENV-0001",
    error_title: "Environment variable is undefined",
    error_message: "process.env.API_KEY is undefined",
    error_type: "ConfigurationError",
    technology: "Node.js",
    root_cause: "The .env file is missing, not loaded, misnamed, or the variable is not set in the deployment environment.",
    solution: "Load the .env file at startup and confirm the variable name and location.",
    solution_steps: [
      "Install dotenv and call require('dotenv').config() at the very top of your entry file.",
      "Check that .env is in the folder you run the app from and the name matches exactly.",
      "Restart the server after changing .env.",
      "Set the variable in your hosting dashboard for production."
    ],
    verification: "Confirm console.log(Boolean(process.env.API_KEY)) prints true without exposing the value.",
    tags: "env, dotenv, environment, process.env, undefined, config",
    status: "verified"
  },

  // ───────────── React / Next.js ─────────────
  {
    error_code: "ASI-REACT-0001",
    error_title: "Too many re-renders",
    error_message: "Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.",
    error_type: "RenderError",
    technology: "React",
    root_cause: "State is updated directly during rendering, or an event handler is called immediately instead of being passed as a function.",
    solution: "Move state updates into event handlers or effects, and pass functions to handlers.",
    solution_steps: [
      "Find any setState call in the component body.",
      "Change onClick={setCount(1)} to onClick={() => setCount(1)}.",
      "Move required updates into useEffect with correct dependencies.",
      "Reload the app."
    ],
    verification: "Confirm the component renders once without the loop error.",
    tags: "react, rerender, state, infinite-loop, usestate, onclick",
    status: "verified"
  },
  {
    error_code: "ASI-REACT-0002",
    error_title: "Invalid hook call",
    error_message: "Error: Invalid hook call. Hooks can only be called inside of the body of a function component.",
    error_type: "HookError",
    technology: "React",
    root_cause: "A hook is called outside a function component, inside a condition or loop, or there are mismatched or duplicate React versions.",
    solution: "Call hooks only at the top level of function components or custom hooks, and ensure a single React copy.",
    solution_steps: [
      "Check that the hook is inside a component or a function starting with 'use'.",
      "Remove hooks from conditions, loops, and nested functions.",
      "Run npm ls react to check for duplicate React versions.",
      "Ensure react and react-dom versions match."
    ],
    verification: "Confirm the component renders without the hook error.",
    tags: "react, hooks, invalid-hook-call, usestate, useeffect, duplicate",
    status: "verified"
  },
  {
    error_code: "ASI-REACT-0003",
    error_title: "Each child in a list needs a unique key",
    error_message: "Warning: Each child in a list should have a unique \"key\" prop.",
    error_type: "Warning",
    technology: "React",
    root_cause: "Elements rendered from an array with map() have no key, or the keys are duplicated.",
    solution: "Give each list item a stable, unique key.",
    solution_steps: [
      "Find the map() that renders the list.",
      "Add key={item.id} to the outermost element returned by map.",
      "Avoid using the array index as key if items can be reordered or removed.",
      "Reload and check the console."
    ],
    verification: "Confirm the warning no longer appears in the console.",
    tags: "react, key, list, map, warning, unique",
    status: "verified"
  },
  {
    error_code: "ASI-REACT-0004",
    error_title: "Objects are not valid as a React child",
    error_message: "Error: Objects are not valid as a React child (found: object with keys {...})",
    error_type: "RenderError",
    technology: "React",
    root_cause: "A plain object (or Date) is being rendered directly in JSX, which only accepts strings, numbers, elements, and arrays.",
    solution: "Render a specific property or convert the value to a string.",
    solution_steps: [
      "Find the JSX expression rendering the object.",
      "Render a field, for example {user.name}, instead of {user}.",
      "Use JSON.stringify or toLocaleString for debugging or dates.",
      "Reload the app."
    ],
    verification: "Confirm the component renders text or elements without an error.",
    tags: "react, jsx, object, child, render, invalid",
    status: "verified"
  },
  {
    error_code: "ASI-REACT-0005",
    error_title: "Cannot update a component while rendering another",
    error_message: "Warning: Cannot update a component while rendering a different component",
    error_type: "Warning",
    technology: "React",
    root_cause: "A component calls a parent's state setter during its render phase instead of in an effect or event.",
    solution: "Move the state update into useEffect or an event handler.",
    solution_steps: [
      "Read the warning to identify both components.",
      "Find the setState or callback prop that runs during render.",
      "Wrap it in useEffect with proper dependencies, or call it from an event.",
      "Reload the app."
    ],
    verification: "Confirm the warning no longer appears when the components render.",
    tags: "react, warning, setstate, render, useeffect, parent",
    status: "verified"
  },
  {
    error_code: "ASI-REACT-0006",
    error_title: "Hydration failed",
    error_message: "Error: Hydration failed because the initial UI does not match what was rendered on the server.",
    error_type: "HydrationError",
    technology: "React / Next.js",
    root_cause: "Server-rendered HTML differs from the first client render, for example from Date.now(), Math.random(), window checks, or invalid HTML nesting.",
    solution: "Make the first client render match the server output.",
    solution_steps: [
      "Find code that behaves differently on server and client, such as random values, dates, or window/localStorage access.",
      "Move browser-only logic into useEffect.",
      "Check for invalid nesting such as <div> inside <p>.",
      "Reload and check the console."
    ],
    verification: "Confirm the page loads without hydration warnings.",
    tags: "react, nextjs, hydration, ssr, mismatch, window",
    status: "verified"
  },
  {
    error_code: "ASI-REACT-0007",
    error_title: "Rendered fewer hooks than expected",
    error_message: "Error: Rendered fewer hooks than expected. This may be caused by an accidental early return statement.",
    error_type: "HookError",
    technology: "React",
    root_cause: "A component returns early before all hooks run, so the number of hooks changes between renders.",
    solution: "Call all hooks before any conditional return.",
    solution_steps: [
      "Find early return statements in the component.",
      "Move every hook call above them.",
      "Put conditions inside the hook or in JSX instead of around the hook.",
      "Reload the app."
    ],
    verification: "Confirm the component renders consistently without the hook error.",
    tags: "react, hooks, early-return, conditional, rules-of-hooks",
    status: "verified"
  },
  {
    error_code: "ASI-REACT-0008",
    error_title: "State update on an unmounted component",
    error_message: "Warning: Can't perform a React state update on an unmounted component.",
    error_type: "Warning",
    technology: "React",
    root_cause: "An async task, timer, or subscription finished after the component was removed and tried to update state.",
    solution: "Cancel or ignore the async work in the effect cleanup function.",
    solution_steps: [
      "Find the effect that starts the request, timer, or subscription.",
      "Return a cleanup function that clears the timer, unsubscribes, or aborts the request with AbortController.",
      "Optionally track an isMounted flag inside the effect.",
      "Test navigating away while the task runs."
    ],
    verification: "Confirm no warning appears when leaving the component mid-request.",
    tags: "react, warning, unmounted, cleanup, useeffect, abortcontroller",
    status: "verified"
  },
  {
    error_code: "ASI-REACT-0009",
    error_title: "useEffect runs in an infinite loop",
    error_message: "useEffect runs on every render / Maximum update depth exceeded",
    error_type: "LogicError",
    technology: "React",
    root_cause: "The effect updates state that is also in its dependency list, or it depends on an object or function recreated on every render.",
    solution: "Fix the dependency array and stabilize object or function dependencies.",
    solution_steps: [
      "Check that the effect has a dependency array.",
      "Remove state that the effect itself sets from the dependencies, or add a guard condition.",
      "Wrap functions with useCallback and objects with useMemo if they are dependencies.",
      "Run the app and watch the network or console for repeats."
    ],
    verification: "Confirm the effect runs only when its real dependencies change.",
    tags: "react, useeffect, infinite-loop, dependencies, usecallback, usememo",
    status: "verified"
  },
  {
    error_code: "ASI-REACT-0010",
    error_title: "Element type is invalid",
    error_message: "Error: Element type is invalid: expected a string or a class/function but got: undefined.",
    error_type: "RenderError",
    technology: "React",
    root_cause: "A component was imported incorrectly (default versus named import) or is not exported, so React receives undefined.",
    solution: "Fix the import or export so it matches.",
    solution_steps: [
      "Find the component named in the error stack.",
      "Check whether it is exported with export default or as a named export.",
      "Match the import: import X from './X' versus import { X } from './X'.",
      "Check for typos in the file path and name casing."
    ],
    verification: "Confirm the component renders without the error.",
    tags: "react, import, export, default, named, undefined, component",
    status: "verified"
  },
  {
    error_code: "ASI-NEXT-0001",
    error_title: "window is not defined",
    error_message: "ReferenceError: window is not defined",
    error_type: "ReferenceError",
    technology: "Next.js",
    root_cause: "Code that uses browser-only objects such as window, document, or localStorage runs on the server during rendering.",
    solution: "Run browser-only code in useEffect or load the component only on the client.",
    solution_steps: [
      "Find the code that reads window, document, or localStorage.",
      "Move it inside useEffect, or check typeof window !== 'undefined'.",
      "For client-only libraries, use next/dynamic with ssr: false.",
      "Restart the dev server."
    ],
    verification: "Confirm the page renders on the server without a ReferenceError.",
    tags: "nextjs, window, ssr, referenceerror, document, localstorage",
    status: "verified"
  },

  // ───────────── HTTP / Browser ─────────────
  {
    error_code: "ASI-HTTP-0002",
    error_title: "Blocked by CORS policy",
    error_message: "Access to fetch at 'URL' from origin 'ORIGIN' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present",
    error_type: "CORSError",
    technology: "Browser / HTTP",
    root_cause: "The server did not send the CORS headers that permit requests from your page's origin.",
    solution: "Configure the server to allow the requesting origin, or use a same-origin proxy.",
    solution_steps: [
      "Check the origin (protocol, domain, port) shown in the error.",
      "On the server, send Access-Control-Allow-Origin for that origin (in Express: the cors middleware).",
      "Handle OPTIONS preflight requests and allow needed methods and headers.",
      "For development, use a dev-server proxy so requests stay same-origin."
    ],
    verification: "Confirm the response includes Access-Control-Allow-Origin and the request succeeds.",
    tags: "cors, http, browser, access-control-allow-origin, preflight, fetch",
    status: "verified"
  },
  {
    error_code: "ASI-HTTP-0003",
    error_title: "404 Not Found",
    error_message: "HTTP 404 Not Found",
    error_type: "HTTPError",
    technology: "HTTP",
    root_cause: "The server cannot find a resource at the requested URL because of a wrong path, a missing route, or a deleted file.",
    solution: "Correct the URL or add the missing route or file.",
    solution_steps: [
      "Compare the requested URL with the routes or files available on the server.",
      "Check spelling, casing, trailing slashes, and the base path such as /api.",
      "Confirm the resource was deployed.",
      "Send the request again."
    ],
    verification: "Confirm the request returns a 200 status.",
    tags: "http, 404, not-found, url, route, status",
    status: "verified"
  },
  {
    error_code: "ASI-HTTP-0004",
    error_title: "500 Internal Server Error",
    error_message: "HTTP 500 Internal Server Error",
    error_type: "HTTPError",
    technology: "HTTP",
    root_cause: "The server hit an unexpected error while handling the request, such as an unhandled exception or a failed database call.",
    solution: "Check the server logs to find and fix the underlying exception.",
    solution_steps: [
      "Open the server or hosting logs for the time of the request.",
      "Find the stack trace or error message.",
      "Fix the bug, such as invalid input handling or a missing configuration value.",
      "Redeploy or restart and retry the request."
    ],
    verification: "Confirm the request returns a successful status and no new errors appear in the logs.",
    tags: "http, 500, server-error, internal, logs, exception",
    status: "verified"
  },
  {
    error_code: "ASI-HTTP-0005",
    error_title: "401 Unauthorized",
    error_message: "HTTP 401 Unauthorized",
    error_type: "HTTPError",
    technology: "HTTP",
    root_cause: "The request has missing, invalid, or expired authentication credentials.",
    solution: "Send valid credentials or refresh the token.",
    solution_steps: [
      "Check that the Authorization header is included, for example Bearer <token>.",
      "Confirm the token or API key is correct and has not expired.",
      "Refresh the token or sign in again.",
      "Retry the request."
    ],
    verification: "Confirm the request returns 200 instead of 401.",
    tags: "http, 401, unauthorized, authentication, token, api-key",
    status: "verified"
  },
  {
    error_code: "ASI-HTTP-0006",
    error_title: "403 Forbidden",
    error_message: "HTTP 403 Forbidden",
    error_type: "HTTPError",
    technology: "HTTP",
    root_cause: "The server understood the request and the identity, but the account lacks permission for that resource.",
    solution: "Use an account with the required permission or adjust the access rules.",
    solution_steps: [
      "Confirm which user or role is making the request.",
      "Check the permissions, roles, or policies on the resource.",
      "Check IP allowlists, firewall rules, and CORS or origin restrictions.",
      "Retry the request after updating access."
    ],
    verification: "Confirm the request returns a success status.",
    tags: "http, 403, forbidden, permission, role, access",
    status: "verified"
  },
  {
    error_code: "ASI-HTTP-0007",
    error_title: "429 Too Many Requests",
    error_message: "HTTP 429 Too Many Requests",
    error_type: "HTTPError",
    technology: "HTTP",
    root_cause: "The client exceeded the API's rate limit.",
    solution: "Slow down requests and retry after the waiting time.",
    solution_steps: [
      "Check the Retry-After header for how long to wait.",
      "Add retries with exponential backoff.",
      "Cache responses and reduce unnecessary calls.",
      "Ask the provider about higher limits if needed."
    ],
    verification: "Confirm requests succeed without 429 responses.",
    tags: "http, 429, rate-limit, throttle, retry-after, api",
    status: "verified"
  },
  {
    error_code: "ASI-HTTP-0008",
    error_title: "Connection refused",
    error_message: "net::ERR_CONNECTION_REFUSED",
    error_type: "NetworkError",
    technology: "Browser / HTTP",
    root_cause: "Nothing is listening at the address and port the browser tried to reach, usually because the server is not running or the port is wrong.",
    solution: "Start the server and use the correct host and port.",
    solution_steps: [
      "Confirm the server process is running.",
      "Check the port in the URL against the port the server prints on startup.",
      "Check for localhost versus 127.0.0.1 and firewall rules.",
      "Reload the page."
    ],
    verification: "Confirm the URL loads and the request receives a response.",
    tags: "http, connection-refused, err_connection_refused, port, localhost, server",
    status: "verified"
  },
  {
    error_code: "ASI-HTTP-0009",
    error_title: "Mixed content blocked",
    error_message: "Mixed Content: The page at 'https://...' was loaded over HTTPS, but requested an insecure resource 'http://...'",
    error_type: "SecurityError",
    technology: "Browser / HTTP",
    root_cause: "An HTTPS page is trying to load scripts, images, or API data over plain HTTP, which browsers block.",
    solution: "Load every resource over HTTPS.",
    solution_steps: [
      "Find the http:// URL named in the console message.",
      "Change it to https:// or use a protocol-relative or relative path.",
      "Confirm the other server supports HTTPS.",
      "Reload the page."
    ],
    verification: "Confirm the console shows no mixed content warnings.",
    tags: "https, mixed-content, http, security, browser, ssl",
    status: "verified"
  },
  {
    error_code: "ASI-HTTP-0010",
    error_title: "502 Bad Gateway",
    error_message: "HTTP 502 Bad Gateway",
    error_type: "HTTPError",
    technology: "HTTP / Reverse proxy",
    root_cause: "A proxy or gateway received an invalid response from the upstream application, often because the app crashed or is not reachable.",
    solution: "Check that the upstream app is running and reachable from the proxy.",
    solution_steps: [
      "Check that your application process is running and did not crash.",
      "Review app logs and proxy (Nginx, load balancer) error logs.",
      "Confirm the proxy points to the right host and port.",
      "Restart the app and retry."
    ],
    verification: "Confirm the URL returns a normal response through the proxy.",
    tags: "http, 502, bad-gateway, nginx, proxy, upstream",
    status: "verified"
  },
  {
    error_code: "ASI-HTTP-0011",
    error_title: "413 Payload Too Large",
    error_message: "HTTP 413 Payload Too Large",
    error_type: "HTTPError",
    technology: "HTTP",
    root_cause: "The request body, such as a file upload, is larger than the server or proxy allows.",
    solution: "Increase the server's size limit or send a smaller payload.",
    solution_steps: [
      "Check the size of the data being sent.",
      "Raise the limit, for example express.json({ limit: '10mb' }) or client_max_body_size in Nginx.",
      "Compress or resize uploads on the client.",
      "Retry the request."
    ],
    verification: "Confirm the upload or request completes with a success status.",
    tags: "http, 413, payload, upload, body-size, nginx, express",
    status: "verified"
  },

  // ───────────── Git ─────────────
  {
    error_code: "ASI-GIT-0001",
    error_title: "Not a git repository",
    error_message: "fatal: not a git repository (or any of the parent directories): .git",
    error_type: "GitError",
    technology: "Git",
    root_cause: "The command was run in a folder that is not a Git repository.",
    solution: "Move into the repository folder or initialize a new one.",
    solution_steps: [
      "Check your current folder with pwd.",
      "cd into the project folder that contains the .git directory.",
      "Or create a new repository with git init.",
      "Run the Git command again."
    ],
    verification: "Confirm git status runs without a fatal error.",
    tags: "git, repository, init, fatal, not-a-git-repository",
    status: "verified"
  },
  {
    error_code: "ASI-GIT-0002",
    error_title: "Failed to push some refs",
    error_message: "error: failed to push some refs to 'origin' hint: Updates were rejected because the remote contains work that you do not have locally",
    error_type: "GitError",
    technology: "Git",
    root_cause: "The remote branch has commits that your local branch does not have, so a push would overwrite them.",
    solution: "Pull and integrate the remote changes, then push again.",
    solution_steps: [
      "Run git pull --rebase origin <branch> (or git pull).",
      "Resolve any conflicts and continue.",
      "Run git push origin <branch>.",
      "Avoid force pushing on shared branches."
    ],
    verification: "Confirm git push completes and the commits appear on the remote.",
    tags: "git, push, rejected, non-fast-forward, pull, rebase",
    status: "verified"
  },
  {
    error_code: "ASI-GIT-0003",
    error_title: "Merge conflict",
    error_message: "CONFLICT (content): Merge conflict in file. Automatic merge failed; fix conflicts and then commit the result.",
    error_type: "GitError",
    technology: "Git",
    root_cause: "Two branches changed the same lines of a file, so Git cannot decide which version to keep.",
    solution: "Edit the conflicted files, choose the correct content, and complete the merge.",
    solution_steps: [
      "Run git status to list conflicted files.",
      "Open each file and resolve the <<<<<<<, =======, >>>>>>> sections.",
      "Run git add <file> for each resolved file.",
      "Finish with git commit (or git rebase --continue)."
    ],
    verification: "Confirm git status shows a clean working tree and no conflict markers remain in the code.",
    tags: "git, merge, conflict, rebase, resolve",
    status: "verified"
  },
  {
    error_code: "ASI-GIT-0004",
    error_title: "Permission denied (publickey)",
    error_message: "git@github.com: Permission denied (publickey). fatal: Could not read from remote repository.",
    error_type: "AuthenticationError",
    technology: "Git / SSH",
    root_cause: "Git could not authenticate over SSH because no key is set up, the key is not added to the agent, or the public key is not added to your Git provider.",
    solution: "Create or load an SSH key and add its public part to your account, or use HTTPS.",
    solution_steps: [
      "Check for a key with ls ~/.ssh, or create one with ssh-keygen -t ed25519.",
      "Start the agent and add the key with ssh-add ~/.ssh/id_ed25519.",
      "Add the public key (.pub) to your GitHub/GitLab SSH settings.",
      "Test with ssh -T git@github.com."
    ],
    verification: "Confirm ssh -T reports a successful authentication and git push/pull works.",
    tags: "git, ssh, publickey, permission-denied, github, authentication",
    status: "verified"
  },
  {
    error_code: "ASI-GIT-0005",
    error_title: "Refusing to merge unrelated histories",
    error_message: "fatal: refusing to merge unrelated histories",
    error_type: "GitError",
    technology: "Git",
    root_cause: "The local and remote repositories were created separately and have no common commit.",
    solution: "Allow the merge explicitly if you are sure the two histories should be combined.",
    solution_steps: [
      "Confirm that the remote repository is the one you intend to combine with.",
      "Run git pull origin <branch> --allow-unrelated-histories.",
      "Resolve any conflicts that appear.",
      "Commit and push."
    ],
    verification: "Confirm the pull completes and git log shows both histories.",
    tags: "git, merge, unrelated-histories, pull, remote",
    status: "verified"
  },
  {
    error_code: "ASI-GIT-0006",
    error_title: "Remote origin already exists",
    error_message: "error: remote origin already exists.",
    error_type: "GitError",
    technology: "Git",
    root_cause: "A remote named origin is already configured in this repository.",
    solution: "Update the existing remote URL, or remove it and add it again.",
    solution_steps: [
      "Run git remote -v to see the current remotes.",
      "Change the URL with git remote set-url origin <new-url>.",
      "Or run git remote remove origin and then git remote add origin <url>.",
      "Run git remote -v again."
    ],
    verification: "Confirm git remote -v shows the correct URL.",
    tags: "git, remote, origin, set-url, add",
    status: "verified"
  },
  {
    error_code: "ASI-GIT-0007",
    error_title: "Author identity unknown",
    error_message: "Author identity unknown *** Please tell me who you are. fatal: unable to auto-detect email address",
    error_type: "ConfigurationError",
    technology: "Git",
    root_cause: "Git has no user name and email configured to attach to commits.",
    solution: "Set your name and email in the Git configuration.",
    solution_steps: [
      "Run git config --global user.name \"Your Name\".",
      "Run git config --global user.email \"you@example.com\".",
      "Check with git config --list.",
      "Commit again."
    ],
    verification: "Confirm the commit succeeds and git log shows your name and email.",
    tags: "git, config, user.name, user.email, commit, identity",
    status: "verified"
  },
  {
    error_code: "ASI-GIT-0008",
    error_title: "File exceeds GitHub's file size limit",
    error_message: "remote: error: File is 120.00 MB; this exceeds GitHub's file size limit of 100.00 MB",
    error_type: "GitError",
    technology: "Git / GitHub",
    root_cause: "A file larger than 100 MB was committed, and GitHub rejects pushes that contain it.",
    solution: "Remove the large file from the history or track it with Git LFS.",
    solution_steps: [
      "Identify the large file from the error message.",
      "If it is not needed, remove it and add it to .gitignore.",
      "Because it is already in a commit, rewrite history (git filter-repo or git rebase -i) or use git lfs migrate.",
      "Push again."
    ],
    verification: "Confirm git push completes without size errors.",
    tags: "git, github, large-file, lfs, 100mb, push, gitignore",
    status: "verified"
  },

  // ───────────── Python ─────────────
  {
    error_code: "ASI-PY-0001",
    error_title: "No module named",
    error_message: "ModuleNotFoundError: No module named 'requests'",
    error_type: "ModuleNotFoundError",
    technology: "Python",
    root_cause: "The package is not installed in the Python environment being used, or the wrong interpreter or virtual environment is active.",
    solution: "Install the package into the correct environment.",
    solution_steps: [
      "Check which Python is running with python --version and which python.",
      "Activate the correct virtual environment.",
      "Install the package with python -m pip install <package>.",
      "Run the script again."
    ],
    verification: "Confirm import <package> works in the same interpreter.",
    tags: "python, modulenotfounderror, pip, import, venv",
    status: "verified"
  },
  {
    error_code: "ASI-PY-0002",
    error_title: "Indentation error",
    error_message: "IndentationError: unexpected indent / expected an indented block",
    error_type: "IndentationError",
    technology: "Python",
    root_cause: "Code blocks are not indented consistently, or tabs and spaces are mixed.",
    solution: "Use consistent indentation, preferably 4 spaces, throughout the file.",
    solution_steps: [
      "Go to the line number in the error.",
      "Make sure every block after a colon (if, for, def, class) is indented.",
      "Convert tabs to spaces in your editor.",
      "Run the script again."
    ],
    verification: "Confirm the script runs without an IndentationError.",
    tags: "python, indentation, tabs, spaces, syntax",
    status: "verified"
  },
  {
    error_code: "ASI-PY-0003",
    error_title: "Name is not defined",
    error_message: "NameError: name 'x' is not defined",
    error_type: "NameError",
    technology: "Python",
    root_cause: "A variable, function, or module is used before it is assigned, imported, or is misspelled.",
    solution: "Define or import the name before using it and check the spelling.",
    solution_steps: [
      "Check the spelling and capitalization of the name.",
      "Make sure it is assigned or imported before the line that uses it.",
      "Check variable scope, such as using a local variable outside a function.",
      "Run the script again."
    ],
    verification: "Confirm the name resolves and the script runs.",
    tags: "python, nameerror, undefined, variable, import, scope",
    status: "verified"
  },
  {
    error_code: "ASI-PY-0004",
    error_title: "KeyError",
    error_message: "KeyError: 'key'",
    error_type: "KeyError",
    technology: "Python",
    root_cause: "A dictionary was accessed with a key that does not exist.",
    solution: "Check that the key exists or use dict.get() with a default.",
    solution_steps: [
      "Print the dictionary keys to see what is available.",
      "Check for spelling, casing, or type differences (for example '1' versus 1).",
      "Use data.get('key', default) or check with 'key' in data.",
      "Run the code again."
    ],
    verification: "Confirm the lookup returns a value or the default without raising KeyError.",
    tags: "python, keyerror, dict, dictionary, get",
    status: "verified"
  },
  {
    error_code: "ASI-PY-0005",
    error_title: "List index out of range",
    error_message: "IndexError: list index out of range",
    error_type: "IndexError",
    technology: "Python",
    root_cause: "An index was used that is greater than or equal to the length of the list, or the list is empty.",
    solution: "Check the list length before indexing and remember indexes start at 0.",
    solution_steps: [
      "Print len(my_list) and the index used.",
      "Make sure the index is less than the length (the last valid index is len - 1).",
      "Check for empty lists before accessing my_list[0].",
      "Run the code again."
    ],
    verification: "Confirm the index is valid and the code runs without an IndexError.",
    tags: "python, indexerror, list, index, range, len",
    status: "verified"
  },
  {
    error_code: "ASI-PY-0006",
    error_title: "Unsupported operand types",
    error_message: "TypeError: unsupported operand type(s) for +: 'int' and 'str'",
    error_type: "TypeError",
    technology: "Python",
    root_cause: "An operation was used on values of incompatible types, such as adding a number and a string.",
    solution: "Convert the values to compatible types before the operation.",
    solution_steps: [
      "Check the types with type(value).",
      "Convert with int(), float(), or str() as needed.",
      "For text output, use an f-string, for example f\"Total: {total}\".",
      "Run the code again."
    ],
    verification: "Confirm the expression runs and produces the expected result.",
    tags: "python, typeerror, operand, int, str, concatenate",
    status: "verified"
  },
  {
    error_code: "ASI-PY-0007",
    error_title: "'NoneType' object has no attribute",
    error_message: "AttributeError: 'NoneType' object has no attribute 'x'",
    error_type: "AttributeError",
    technology: "Python",
    root_cause: "A variable is None, often because a function returned nothing or a search or lookup found no match.",
    solution: "Check for None before using the attribute and fix the function that returns None.",
    solution_steps: [
      "Print the variable to confirm it is None.",
      "Find the function or call that produced it and check its return statement.",
      "Add a check such as if value is not None before accessing attributes.",
      "Run the code again."
    ],
    verification: "Confirm the variable holds a valid object before the attribute access.",
    tags: "python, attributeerror, nonetype, none, return",
    status: "verified"
  },
  {
    error_code: "ASI-PY-0008",
    error_title: "Invalid literal for int()",
    error_message: "ValueError: invalid literal for int() with base 10: 'abc'",
    error_type: "ValueError",
    technology: "Python",
    root_cause: "int() was given a string that is not a valid whole number, such as text, decimals, or empty input.",
    solution: "Validate or clean the input before converting it.",
    solution_steps: [
      "Print the value being converted.",
      "Strip whitespace with .strip() and remove unwanted characters.",
      "Use float() first for decimal strings, or wrap the conversion in try/except ValueError.",
      "Run the code again."
    ],
    verification: "Confirm valid input converts and invalid input is handled without a crash.",
    tags: "python, valueerror, int, conversion, input, string",
    status: "verified"
  },
  {
    error_code: "ASI-PY-0009",
    error_title: "Division by zero",
    error_message: "ZeroDivisionError: division by zero",
    error_type: "ZeroDivisionError",
    technology: "Python",
    root_cause: "A number was divided (or used with modulo) by zero.",
    solution: "Check the divisor before dividing.",
    solution_steps: [
      "Find the division or modulo operation.",
      "Print the divisor to see why it is zero.",
      "Add a condition to handle zero, or catch ZeroDivisionError.",
      "Run the code again."
    ],
    verification: "Confirm the code handles a zero divisor without crashing.",
    tags: "python, zerodivisionerror, division, zero, math",
    status: "verified"
  },
  {
    error_code: "ASI-PY-0010",
    error_title: "File not found",
    error_message: "FileNotFoundError: [Errno 2] No such file or directory: 'file.txt'",
    error_type: "FileNotFoundError",
    technology: "Python",
    root_cause: "The file path is wrong or relative to a different working directory than expected.",
    solution: "Use the correct path, ideally built from the script's location.",
    solution_steps: [
      "Print os.getcwd() to see the current working directory.",
      "Check the file name, extension, and folder.",
      "Use an absolute path or pathlib.Path(__file__).parent / 'file.txt'.",
      "Run the script again."
    ],
    verification: "Confirm os.path.exists(path) returns True and the file opens.",
    tags: "python, filenotfounderror, path, open, file, cwd",
    status: "verified"
  },
  {
    error_code: "ASI-PY-0011",
    error_title: "Externally managed environment",
    error_message: "error: externally-managed-environment",
    error_type: "EnvironmentError",
    technology: "Python / pip",
    root_cause: "The system Python is managed by the operating system, so pip refuses to install packages globally to avoid breaking it.",
    solution: "Install packages inside a virtual environment.",
    solution_steps: [
      "Create one with python3 -m venv .venv.",
      "Activate it (source .venv/bin/activate, or .venv\\Scripts\\activate on Windows).",
      "Run pip install <package>.",
      "For command-line tools, consider pipx."
    ],
    verification: "Confirm pip install completes and the package imports inside the virtual environment.",
    tags: "python, pip, externally-managed-environment, venv, install, pep668",
    status: "verified"
  },
  {
    error_code: "ASI-PY-0012",
    error_title: "Unicode decode error",
    error_message: "UnicodeDecodeError: 'utf-8' codec can't decode byte 0x.. in position ..: invalid start byte",
    error_type: "UnicodeDecodeError",
    technology: "Python",
    root_cause: "The file or data is not encoded as UTF-8 but is being read as UTF-8.",
    solution: "Open the file with the correct encoding.",
    solution_steps: [
      "Identify the likely encoding, such as cp1252, latin-1, or utf-8-sig.",
      "Open the file with open(path, encoding='cp1252').",
      "As a last resort, add errors='replace' to skip bad bytes.",
      "Save files as UTF-8 going forward."
    ],
    verification: "Confirm the file reads without errors and the text looks correct.",
    tags: "python, unicode, decode, utf-8, encoding, csv, file",
    status: "verified"
  },

  // ───────────── Databases ─────────────
  {
    error_code: "ASI-DB-0001",
    error_title: "SQLite: no such table",
    error_message: "SqliteError: no such table: errors",
    error_type: "DatabaseError",
    technology: "SQLite",
    root_cause: "The query references a table that does not exist in the connected database file, often because the schema was not created or a different database path was opened.",
    solution: "Create the table and confirm the database file path.",
    solution_steps: [
      "Print the absolute database path your app opens.",
      "Open that file with the sqlite3 CLI and run .tables.",
      "Run your schema or migration script to create the missing table.",
      "Run the query again."
    ],
    verification: "Confirm .tables lists the table and the query returns without an error.",
    tags: "sqlite, better-sqlite3, no-such-table, schema, migration, database",
    status: "verified"
  },
  {
    error_code: "ASI-DB-0002",
    error_title: "SQLite: database is locked",
    error_message: "SQLITE_BUSY: database is locked",
    error_type: "DatabaseError",
    technology: "SQLite",
    root_cause: "Another connection or process holds a write lock on the database, or a transaction was left open.",
    solution: "Close other connections, keep transactions short, and enable WAL mode.",
    solution_steps: [
      "Close other tools or scripts that have the database open.",
      "Make sure every transaction is committed or rolled back.",
      "Enable WAL mode with PRAGMA journal_mode = WAL.",
      "Set a busy timeout and retry."
    ],
    verification: "Confirm writes complete without SQLITE_BUSY.",
    tags: "sqlite, locked, busy, wal, transaction, concurrency",
    status: "verified"
  },
  {
    error_code: "ASI-DB-0003",
    error_title: "UNIQUE constraint failed",
    error_message: "SqliteError: UNIQUE constraint failed: errors.error_code",
    error_type: "ConstraintError",
    technology: "SQLite",
    root_cause: "An insert or update used a value that already exists in a column that must be unique.",
    solution: "Use a new unique value, or update or ignore the existing row.",
    solution_steps: [
      "Check which column is named in the error.",
      "Query the table to see the existing row.",
      "Use INSERT OR IGNORE, INSERT OR REPLACE, or an UPSERT (ON CONFLICT DO UPDATE) if appropriate.",
      "Run the statement again."
    ],
    verification: "Confirm the statement runs without a constraint error and the data is correct.",
    tags: "sqlite, unique, constraint, insert, upsert, duplicate",
    status: "verified"
  },
  {
    error_code: "ASI-DB-0004",
    error_title: "PostgreSQL: relation does not exist",
    error_message: "error: relation \"users\" does not exist",
    error_type: "DatabaseError",
    technology: "PostgreSQL",
    root_cause: "The table is missing, in a different schema, or the name has different casing or quoting.",
    solution: "Create the table or reference it with the correct schema and name.",
    solution_steps: [
      "Confirm you are connected to the right database.",
      "List tables with \\dt or \\dt schema.*.",
      "Check for quoted, mixed-case names and the search_path.",
      "Run the migrations or create the table, then retry."
    ],
    verification: "Confirm the query returns rows or an empty result without an error.",
    tags: "postgresql, postgres, relation, table, schema, migration",
    status: "verified"
  },
  {
    error_code: "ASI-DB-0005",
    error_title: "PostgreSQL connection refused",
    error_message: "Error: connect ECONNREFUSED 127.0.0.1:5432",
    error_type: "ConnectionError",
    technology: "PostgreSQL",
    root_cause: "No PostgreSQL server is accepting connections at that host and port.",
    solution: "Start the database and check the connection settings.",
    solution_steps: [
      "Check that the PostgreSQL service is running.",
      "Verify host, port (default 5432), username, password, and database name.",
      "In Docker, use the service name instead of localhost from another container.",
      "Retry the connection."
    ],
    verification: "Confirm the app connects and a simple query such as SELECT 1 succeeds.",
    tags: "postgresql, econnrefused, connection, database, docker, port",
    status: "verified"
  },
  {
    error_code: "ASI-DB-0006",
    error_title: "MongoDB server selection timed out",
    error_message: "MongooseServerSelectionError: connect ECONNREFUSED / Server selection timed out after 30000 ms",
    error_type: "ConnectionError",
    technology: "MongoDB",
    root_cause: "The driver could not reach a MongoDB server, because the service is down, the URI is wrong, or the IP address is not allowed (for example in MongoDB Atlas).",
    solution: "Check the connection string, server status, and network access rules.",
    solution_steps: [
      "Verify the connection string, including username, password, and host.",
      "Start the local mongod service, or check the Atlas cluster status.",
      "In Atlas, add your IP address under Network Access.",
      "Restart the app and retry."
    ],
    verification: "Confirm the app logs a successful database connection.",
    tags: "mongodb, mongoose, atlas, connection, timeout, ip-whitelist",
    status: "verified"
  },

  // ───────────── TypeScript ─────────────
  {
    error_code: "ASI-TS-0001",
    error_title: "Type is not assignable",
    error_message: "TS2322: Type 'string' is not assignable to type 'number'.",
    error_type: "TypeScriptError",
    technology: "TypeScript",
    root_cause: "A value of one type is assigned to a variable or parameter that expects a different type.",
    solution: "Convert the value or update the declared type so both match.",
    solution_steps: [
      "Read both types in the message.",
      "Convert the value, for example Number(value), or fix the source of the wrong type.",
      "If the declared type is wrong, update it (for example string | number).",
      "Re-run the TypeScript compiler."
    ],
    verification: "Confirm tsc runs with no TS2322 errors.",
    tags: "typescript, ts2322, type, assignable, string, number",
    status: "verified"
  },
  {
    error_code: "ASI-TS-0002",
    error_title: "Property does not exist on type",
    error_message: "TS2339: Property 'x' does not exist on type 'Y'.",
    error_type: "TypeScriptError",
    technology: "TypeScript",
    root_cause: "The code accesses a property that is not part of the declared type.",
    solution: "Add the property to the type or interface, or narrow the type before accessing it.",
    solution_steps: [
      "Check the property name for typos.",
      "Add the property to the interface or type definition.",
      "Use a type guard or optional chaining if the type is a union.",
      "Re-run the compiler."
    ],
    verification: "Confirm tsc no longer reports TS2339.",
    tags: "typescript, ts2339, property, interface, type, union",
    status: "verified"
  },
  {
    error_code: "ASI-TS-0003",
    error_title: "Parameter implicitly has an 'any' type",
    error_message: "TS7006: Parameter 'x' implicitly has an 'any' type.",
    error_type: "TypeScriptError",
    technology: "TypeScript",
    root_cause: "With strict or noImplicitAny enabled, TypeScript needs an explicit type for parameters it cannot infer.",
    solution: "Add an explicit type annotation.",
    solution_steps: [
      "Find the function parameter named in the error.",
      "Annotate it, for example (x: string) => ...",
      "Use a specific interface instead of any when possible.",
      "Re-run the compiler."
    ],
    verification: "Confirm tsc runs without TS7006.",
    tags: "typescript, ts7006, any, noimplicitany, strict, parameter",
    status: "verified"
  },
  {
    error_code: "ASI-TS-0004",
    error_title: "Cannot find module or type declarations",
    error_message: "TS2307: Cannot find module 'x' or its corresponding type declarations.",
    error_type: "TypeScriptError",
    technology: "TypeScript",
    root_cause: "The module is not installed, the path is wrong, or the package has no type definitions.",
    solution: "Install the package and its types, and check the import path and tsconfig.",
    solution_steps: [
      "Install the package if missing (npm install x).",
      "Install types if needed (npm install -D @types/x).",
      "Check relative paths, file extensions, and paths or baseUrl in tsconfig.json.",
      "Restart the TypeScript server in your editor."
    ],
    verification: "Confirm the import resolves and tsc reports no TS2307.",
    tags: "typescript, ts2307, module, types, declarations, tsconfig",
    status: "verified"
  },
  {
    error_code: "ASI-TS-0005",
    error_title: "Object is possibly undefined or null",
    error_message: "TS2532: Object is possibly 'undefined'.",
    error_type: "TypeScriptError",
    technology: "TypeScript",
    root_cause: "Strict null checks found a value that could be undefined or null when it is used.",
    solution: "Check or default the value before using it.",
    solution_steps: [
      "Find the expression named in the error.",
      "Use optional chaining (obj?.prop) or a condition (if (obj) { ... }).",
      "Provide defaults with the nullish operator (value ?? fallback).",
      "Use a non-null assertion (!) only when you are certain."
    ],
    verification: "Confirm tsc no longer reports the error and the code handles missing values.",
    tags: "typescript, ts2532, undefined, null, strict, optional-chaining",
    status: "verified"
  },

  // ───────────── Docker ─────────────
  {
    error_code: "ASI-DOCK-0001",
    error_title: "Port is already allocated",
    error_message: "Bind for 0.0.0.0:3000 failed: port is already allocated",
    error_type: "DockerError",
    technology: "Docker",
    root_cause: "Another container or program on the host already uses the port you are trying to publish.",
    solution: "Free the port or map the container to a different host port.",
    solution_steps: [
      "Run docker ps to see containers using the port.",
      "Stop the conflicting container (docker stop <id>) or program.",
      "Or change the mapping, for example -p 3001:3000.",
      "Start the container again."
    ],
    verification: "Confirm the container starts and the app responds on the chosen port.",
    tags: "docker, port, allocated, bind, container, conflict",
    status: "verified"
  },
  {
    error_code: "ASI-DOCK-0002",
    error_title: "Cannot connect to the Docker daemon",
    error_message: "Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?",
    error_type: "DockerError",
    technology: "Docker",
    root_cause: "The Docker service is not running or your client cannot reach it.",
    solution: "Start Docker and confirm the client can connect.",
    solution_steps: [
      "Open Docker Desktop, or on Linux run sudo systemctl start docker.",
      "Wait until Docker reports it is running.",
      "Run docker version to check both client and server respond.",
      "Retry your command."
    ],
    verification: "Confirm docker ps runs without a connection error.",
    tags: "docker, daemon, docker.sock, service, start, connection",
    status: "verified"
  },
  {
    error_code: "ASI-DOCK-0003",
    error_title: "No space left on device",
    error_message: "no space left on device",
    error_type: "DockerError",
    technology: "Docker",
    root_cause: "Docker images, containers, volumes, or build cache have filled the available disk space.",
    solution: "Remove unused Docker data.",
    solution_steps: [
      "Check usage with docker system df.",
      "Remove unused data with docker system prune (add --volumes only if you are sure).",
      "Delete old images with docker image prune -a.",
      "Increase Docker's disk allocation if you use Docker Desktop."
    ],
    verification: "Confirm the build or run completes and docker system df shows free space.",
    tags: "docker, disk, space, prune, images, volumes",
    status: "verified"
  },
  {
    error_code: "ASI-DOCK-0004",
    error_title: "Permission denied on Docker socket",
    error_message: "permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock",
    error_type: "PermissionError",
    technology: "Docker",
    root_cause: "Your user is not in the docker group, so it cannot access the Docker socket.",
    solution: "Add your user to the docker group and start a new session.",
    solution_steps: [
      "Run sudo usermod -aG docker $USER.",
      "Log out and log back in, or run newgrp docker.",
      "Run docker ps to test.",
      "Avoid running everything with sudo if possible."
    ],
    verification: "Confirm docker ps works without sudo.",
    tags: "docker, permission-denied, docker.sock, group, linux, sudo",
    status: "verified"
  }
];

const insert = db.prepare(`
  INSERT OR IGNORE INTO errors (
    error_code,
    error_title,
    error_message,
    error_type,
    technology,
    root_cause,
    solution,
    solution_steps,
    verification,
    tags,
    status
  ) VALUES (
    @error_code,
    @error_title,
    @error_message,
    @error_type,
    @technology,
    @root_cause,
    @solution,
    @solution_steps,
    @verification,
    @tags,
    @status
  )
`);

const addErrors = db.transaction((records) => {
  let added = 0;

  for (const error of records) {
    const result = insert.run({
      ...error,
      solution_steps: JSON.stringify(error.solution_steps)
    });

    added += result.changes;
  }

  return added;
});

const added = addErrors(errors);

console.log(`Dataset import completed.`);
console.log(`Total records in script: ${errors.length}`);
console.log(`New records added: ${added}`);
console.log(`Existing records skipped: ${errors.length - added}`);

db.close();