export const routes = function (app: any): void {
  

        app.use('/api/message', require('./main_apis/messages'));

  }