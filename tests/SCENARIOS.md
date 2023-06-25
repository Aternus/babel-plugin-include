# SCENARIOS

1. ✅ **Basic File Inclusion**: Test that the plugin correctly replaces
   "include(pathToFile)" with the content of "pathToFile" when given a valid
   path to a file.

2. ✅ **Relative Paths**: Test that the plugin correctly handles relative paths,
   both in the form of "../file" and "./file".

3. ✅ **Absolute Paths**: Test that the plugin correctly handles absolute paths.

4. ✅ **Multiple Includes**: Test how the plugin handles a file with multiple
   "include(pathToFile)" calls.

5. ✅ **File Not Found**: Test that the plugin appropriately handles the case
   where "pathToFile" points to a file that does not exist. Depending on the
   expected behavior, this could either throw an error or return some default
   value.

6. ✅ **Nested Inclusions**: Test that the plugin correctly handles the case
   where an included file itself includes another file. This will test the
   plugin's recursive capabilities.

7. **Cyclic Inclusions**: Test how the plugin handles the case where there's a
   cycle in the inclusion (File A includes File B, and File B includes File A).
   Depending on the intended behavior, it could either handle it gracefully,
   throw an error, or end up in an infinite loop.

8. **Include in Different Scopes**: Test the behavior of the plugin when the
   include function is called inside different scopes (global scope, function
   scope, block scope, etc.).

9. **Non-String Arguments**: Test how the plugin reacts to non-string arguments
   to the "include" function.

10. **Empty Arguments**: Test how the plugin reacts to an empty argument to the
    "include" function.

11. **Whitespace Handling**: Test how the plugin handles files that have
    leading/trailing white space or white space between elements.

12. **Binary Files**: Test how the plugin handles binary files.

13. **Unsupported File Types**: Test how the plugin handles unsupported file
    types.

14. **Large Files**: Test how the plugin handles very large files. This could
    potentially reveal performance or memory usage issues.
