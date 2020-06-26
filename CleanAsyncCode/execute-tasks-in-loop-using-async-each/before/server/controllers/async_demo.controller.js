import Company from '../models/company.model';
import Job from '../models/job.model';
import Application from '../models/application.model';
import Licence from '../models/licence.model';
import RestClientService from '../helpers/node-rest-client.service';

const async = require('async');


function loopDemo(req, res, next) {

  let users = [1, 2, 3, 4, 5, 6];

  let results = [];

  users.forEach(userId => {
    RestClientService.get(`http://jsonplaceholder.typicode.com/users/${userId}/posts`,(posts,response) => {
      if(response.statusCode !== 200){
        return res.status(500).send('Unable to find posts');
      }
      results.push(posts);
    });
  });

  return res.json(results);
}

function parallelDemo(req, res, next) {

  async.parallel({
    posts: cb => {

      RestClientService.methods.getPosts((posts, response) => {
        if (response.statusCode !== 200) {
          return cb('Unable to process posts request');
        }
        return cb(null, posts);
      })

    },
    albums: cb => {
      RestClientService.methods.getAlbums((albums, response) => {
        if (response.statusCode !== 200) {
          return cb('Unable to process album request');
        }
        return cb(null, albums);
      })
    },
    photos: cb => {

      RestClientService.methods.getPhotos((photos, response) => {
        if (response.statusCode !== 200) {
          return cb('Unable to process photos request');
        }
        return cb(null, photos);
      })
    }
  }, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json(result);
  })
}

function waterfallDemo(req, res, next) {

  const tasks = [

    function createCompany(cb) {

      const company = new Company({
        name: 'FullStackhour'
      });

      company.save(function (err, savedCompany) {
        if (err) {
          return cb(err);
        }
        return cb(null, savedCompany);
      });
    },
    function createJob(company, cb) {
      const job = new Job({
        title: 'Node.js Developer',
        _company: company._id
      });
      job.save((err, savedJob) => {
        if (err) {
          return cb(err);
        }
        return cb(null, {
          job: savedJob,
          company
        });
      });
    },
    function createApplication(result, cb) {

      //create Application
      const application = new Application({
        _job: result.job._id,
        _company: result.company._id
      });
      application.save((err, savedApp) => {
        if (err) {
          return cb(err);
        }
        return cb(null, {
          job: result.job,
          company: result.company,
          application: savedApp
        });
      })
    },
    function createLicence(result, cb) {

      const licence = new Licence({
        name: 'FREE',
        _application: result.application._id
      });
      licence.save((err, savedLic) => {
        if (err) {
          return cb(err);
        }
        return cb(null, {
          job: result.job,
          company: result.company,
          application: result.application,
          licence: savedLic
        });
      })
    }

  ];

  async.waterfall(tasks, (err, results) => {
    if (err) {
      return next(err);
    }
    return res.json(results);
  })

}

function waterfallExampl() {
  async.waterfall([
    function (callback) {
      callback(null, 'one', 'two'); //company Object
    },
    function (arg1, arg2, callback) {
      // arg1 now equals 'one' and arg2 now equals 'two'
      callback(null, 'three');   //job object
    },
    function (arg1, callback) {
      // arg1 now equals 'three'
      callback(null, 'done');   //application
    }
  ], function (err, result) {
    // result now equals 'done'
    return res.json(result);
  });
}

function seriesDemo(req, res, next) {

  let rsp = {};

  const tasks = [

    function createCompany(cb) {

      const company = new Company({
        name: 'FullStackhour'
      });

      company.save(function (err, savedCompany) {
        if (err) {
          return cb(err);
        }
        rsp.company = savedCompany;
        return cb(null, savedCompany);
      });

    },
    function createJob(cb) {
      const job = new Job({
        title: 'Node.js Developer',
        _company: rsp.company._id
      });
      job.save((err, savedJob) => {
        if (err) {
          return cb(err);
        }
        rsp.job = savedJob;
        return cb(null, savedJob);
      })

    },
    function createApplication(cb) {

      //create Application
      const application = new Application({
        _job: rsp.job._id,
        _company: rsp.company._id
      });
      application.save((err, savedApp) => {
        if (err) {
          return cb(err);
        }
        rsp.application = savedApp;
        return cb(null, savedApp);
      })
    },
    function createLicence(cb) {

      const licence = new Licence({
        name: 'FREE',
        _application: rsp.application._id
      });
      licence.save((err, savedLic) => {
        if (err) {
          return cb(err);
        }
        return cb(null, savedLic);
      })
    }
  ];

  async.series(tasks, (err, results) => {
    if (err) {
      return next(err);
    }
    return res.json(results);
  })

}

function seriesCallbackHell() {
  //create Company
  const company = new Company({
    name: 'FullStackHour'
  });
  company.save((err, savedCmp) => {
    if (err) {
      return next(err);
    }

    //create Job
    const job = new Job({
      title: 'Node.js Developer',
      _company: savedCmp._id
    });
    job.save((err, savedJob) => {
      if (err) {
        return next(err);
      }

      //create Application
      const application = new Application({
        _job: savedJob._id,
        _company: savedCmp._id
      });
      application.save((err, savedApp) => {
        if (err) {
          return next(err);
        }

        //Create Licence
        const licence = new Licence({
          name: 'FREE',
          _application: savedApp._id
        });
        licence.save((err, savedLic) => {
          if (err) {
            return next(err);
          }

          return res.json({
            company: savedCmp,
            job: savedJob,
            application: savedApp,
            licence: savedLic
          });

        });
      });
    });
  });
}

export default {
  seriesDemo,
  waterfallDemo,
  parallelDemo,
  loopDemo
}
