
TIME.LOAD = new Date();

$(() => {
  TIME.READY = new Date();

  Log.line()();
  Log.class(`${Project.NAME} (${Project.KEY})`, 'Init')();

  PS = new Process();

  TIME.START = new Date();

  Log.line()();
  Log.log('Time', Log.ALIGN_CENTER)();
  Log.time()();
  Log.classKey(
    'HTML Analysis',
    new Date(TIME.ANALYSIS - TIME.INIT).formatString('%S.%MSs'),
    new Date(TIME.ANALYSIS - TIME.INIT).formatString('%S.%MSs')
  )();
  Log.classKey(
    'JavaScript Load',
    new Date(TIME.LOAD - TIME.ANALYSIS).formatString('%S.%MSs'),
    new Date(TIME.LOAD - TIME.INIT).formatString('%S.%MSs')
  )();
  Log.classKey(
    'Element Ready',
    new Date(TIME.READY - TIME.LOAD).formatString('%S.%MSs'),
    new Date(TIME.READY - TIME.INIT).formatString('%S.%MSs')
  )();
  Log.classKey(
    `${Project.NAME} Start`,
    new Date(TIME.START - TIME.READY).formatString('%S.%MSs'),
    new Date(TIME.START - TIME.INIT).formatString('%S.%MSs')
  )();
  Log.line()();
  Log.class(`${Project.NAME} (${Project.KEY})`, 'Start')();
});
