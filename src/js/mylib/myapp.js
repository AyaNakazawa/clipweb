
TIME.LOAD = new Date();

$(() => {
  TIME.READY = new Date();

  Log.log();
  Log.logClass(`${Project.NAME} (${Project.KEY})`, 'Init');

  PS = new Process();

  TIME.START = new Date();

  Log.log();
  Log.logClassKey(
    'Load',
    new Date(TIME.LOAD - TIME.INIT).formatString('%S.%MSs'),
    new Date(TIME.LOAD - TIME.INIT).formatString('%S.%MSs')
  );
  Log.logClassKey(
    'Ready',
    new Date(TIME.READY - TIME.LOAD).formatString('%S.%MSs'),
    new Date(TIME.READY - TIME.INIT).formatString('%S.%MSs')
  );
  Log.logClassKey(
    'Start',
    new Date(TIME.START - TIME.READY).formatString('%S.%MSs'),
    new Date(TIME.START - TIME.INIT).formatString('%S.%MSs')
  );
  Log.log();
  Log.logClass(`${Project.NAME} (${Project.KEY})`, 'Start');
});
