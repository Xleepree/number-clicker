NC.Intervals.intervalMap = new Map();

NC.Intervals.intervalExists = function(name) {
    return NC.Intervals.intervalMap.has(name);
}

NC.Intervals.startInterval = function({
        name, 
        fn, 
        fnParams = [], 
        delay
    }) {
    if (NC.Intervals.intervalExists(name)) {
        return NC.Logs.internalError(`Interval ${name} is already running`);
    } else {
        if (!Array.isArray(fnParams)) { fnParams = [fnParams]; }
        const id = setInterval(fn, delay, ...fnParams);
        NC.Intervals.intervalMap.set(name, {
            id,
            fn,
            fnParams,
            delay,
            startedAt: Date.now()
        });
    }
}

NC.Intervals.stopInterval = function(name) {
    if (!NC.Intervals.intervalExists(name)) { 
        return NC.Logs.internalError(`Interval "${name}" to stop not found`);
    } else {
        const interval = NC.Intervals.intervalMap.get(name);
        clearInterval(interval.id);
        NC.Intervals.intervalMap.delete(name);
    }
}

NC.Intervals.restartInterval = function(name) {
    if (!NC.Intervals.intervalExists(name)) { 
        return NC.Logs.internalError(`Interval "${name}" to restart not found`);
    } else {
        const interval = NC.Intervals.intervalMap.get(name);
        clearInterval(interval.id);
        interval.id = setInterval(interval.fn, interval.delay, ...interval.fnParams);
    }
}

NC.Intervals.stopAllIntervals = function() {
    for (const interval of NC.Intervals.intervalMap.values()) {
        clearInterval(interval.id);
    }
    NC.Intervals.intervalMap.clear();
}

