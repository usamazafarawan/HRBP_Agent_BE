export const routes = function (app: any): void {

    app.use('/api/signUp', require('./main_apis/signup'));
    app.use('/api/file', require('./main_apis/uploadFeeStrucDoc'));
    app.use('/api/studentRecord', require('./main_apis/studentRecord'));
    app.use('/api/studentAccount', require('./main_apis/studentAccount'));


    // new code

    app.use('/api/auth', require('./main_apis/signup'));
    app.use('/api/students', require('./main_apis/students'));
    app.use('/api/parent-account', require('./main_apis/parents_account'));
    app.use('/api/expense', require('./main_apis/school_expenses'));
    app.use('/api/dashboard', require('./main_apis/dashboard'));





  }