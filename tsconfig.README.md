# tsconfig README

## compiler options

|                                  |          |                                                                                                                                                |
| -------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| target                           | ESNext   | Set the JavaScript language version for emitted JavaScript and include compatible library declarations.                                        |
| module                           | NodeNext | Specify what module code is generated.                                                                                                         |
| declaration                      | true     | Generate .d.ts files from TypeScript and JavaScript files in your project.                                                                     |
| declarationMap                   | true     | Create sourcemaps for d.ts files.                                                                                                              |
| inlineSourceMap                  | true     | Include sourcemap files inside the emitted JavaScript.                                                                                         |
| outDir                           | ./dist   | Specify an output folder for all emitted files.                                                                                                |
| esModuleInterop                  | true     | Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. |
| forceConsistentCasingInFileNames | true     | Ensure that casing is correct in imports.                                                                                                      |
| strict                           | true     | Enable all strict type-checking options.                                                                                                       |
| skipLibCheck                     | true     | Skip type checking all .d.ts files.                                                                                                            |

## exclude

A list of directories or files.

## include

A list of directories or files.

