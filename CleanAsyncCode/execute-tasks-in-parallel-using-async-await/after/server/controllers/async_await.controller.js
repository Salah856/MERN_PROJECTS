import Company from '../models/company.model';
import Job from '../models/job.model';
import Application from '../models/application.model';
import Licence from '../models/licence.model';

import {getPosts, getAlbums, getPhotos} from '../helpers/axios-api.service';



function parallelDemo(req,res,next) {

  const processRequest = async () => {

   const [posts, albums, photos] = await Promise.all([
       getPosts(),
       getAlbums(),
       getPhotos()
     ]);

   return{
     posts: posts.data,
     albums: albums.data,
     photos: photos.data
   };

  };

  processRequest()
    .then(rsp => {
      return res.json(rsp);
    })
    .catch(err => {
      return res.stats(500).send(err);
    });
}


function seriesDemo(req, res, next) {

    const saveRequest = async () => {

        const company = new Company({
            name: 'FullStackhour'
        });
        const savedCompany = await company.save();

        const job = new Job({
            title: 'Node.js Developer',
            _company: savedCompany._id
        });
        const savedJob = await job.save();

        const application = new Application({
            _job: savedJob._id,
            _company: savedCompany._id
        });
        const savedApp = await application.save();

        const licence = new Licence({
            name: 'FREE',
            _application: savedApp._id
        });

        const savedLic = await licence.save();


        return {
            company: savedCompany,
            job: savedJob,
            application: savedApp,
            savedLic: licence
        };


    }

    saveRequest()
    .then(result =>{
        return res.json(result);
    })
    .catch(err => next(err));

}
export default {
    seriesDemo,
    parallelDemo
}
