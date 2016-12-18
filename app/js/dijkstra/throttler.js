const DELAY = 100;

//func should be pure function
export let throttleFunc = (func, args, hashcodeFunc = null) => {
    let lastHashcode = null;
    let closureArgs = args;
    let disposable = setInterval(() => {
        let hashcode = hashcodeFunc(closureArgs);
        if (hashcodeFunc !== null && lastHashcode !== null && hashcode === lastHashcode) return;
        lastHashcode = hashcode;
        func(closureArgs);
    }, DELAY);

    return {
        dispose: () => clearInterval(disposable),
        changeArgs: (args) => closureArgs = args
    };
}
