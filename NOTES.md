## TODO

- Package to npm
- Package client to npm
- Able to run on different port number
    - Command line arg to run on differnet port
    - or ability to change port via UI
        - Use neu extenions to change port # of ws server in the extension
        - Will need to import and init neu again to send commands to extension
- Able to connect more than one web app on different tabs
- Pause / step through changes
    - use history proxy in web app
- "Manual Mode"
    - Watch changes on only tree branches user selects
    - or ignore changes on tree branches user chooses to ignore
        - proxy setup in web app on each node we want to watch
- Show a list of state changes with time elapsed in-between
    - Group by each set recv'd
- Performance improvements
    - Don't send entire state tree on every change