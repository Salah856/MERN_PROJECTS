import Company from '../models/company.model';
import Job from '../models/job.model';
import Application from '../models/application.model';
import Licence from '../models/licence.model';

import {getPosts, getAlbums, getPhotos} from '../helpers/axios-api.service';

function parallelDemo(req, res, next) {

  Promise.all([
    getPosts(),
    getAlbums(),
    getPhotos()
  ])
    .then(results => {

      let [posts, albums, photos] = results;

      return res.json({
        posts: posts.data,
        albums: albums.data,
        photos: photos.data
      });

    })
    .catch(err => {

      return res.status(500).send(err);

    })
}

const promiseChaining = (req, res, next) => {

  let rsp = {};
  const company = new Company({
    name: 'FullStackhour'
  });

  company.save()
    .then(savedCompany => {

      rsp.company = savedCompany;
      const job = new Job({
        title: 'Node.js Developer',
        _company: rsp.company._id
      });

      return job.save();
    })
    .then(savedJob => {
      const application = new Application({
        _job: savedJob._id,
        _company: rsp.company._id
      });
      rsp.job = savedJob;
      return application.save();
    })
    .then(savedApp => {
      const licence = new Licence({
        name: 'FREE',
        _application: savedApp._id
      });

      rsp.application = savedApp;
      return licence.save();

    })
    .then(savedLic => {
      rsp.licence = savedLic;
      return res.json(rsp);
    })
    .catch(err => {
      return next(err);
    })

}


export default {
  promiseChaining,
  parallelDemo
}
