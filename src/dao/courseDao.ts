import {models}  from '../model/model'
import {IBatch, ICourse} from "../model/interfaces";

export async function getCourses():Promise<ICourse[] | null> {
    return await models.Course.findAll({
        include:[{
            model:models.Batch,
            attributes: ['id','name'],
        }]
    })
}
export async function getBatches(id:number):Promise<IBatch[] | null> {
    return await models.Batch.findAll({
        include:[{
            model:models.Course,
            where:{
                id:id
            },
            attributes: ['id','name'],
        }]
    })
}

export async function getBatcheById(id:number,bid:number):Promise<IBatch | null> {
    return await models.Batch.findOne({
        where:{
            id:bid
        },
        include:[{
            model:models.Course,
            where:{
                id:id
            },
            attributes: ['id','name'],
        }]
    })
}

export async function getCoursesById(id:number):Promise<ICourse | null> {
    return await models.Course.findById(id)
}


export async function addCourses(newCourse:ICourse):Promise<ICourse | null> {
    return await models.Course.create({
        name: newCourse.name
    })
}

export function addBatch(batchId:number,newBatch:IBatch):Promise<IBatch | null> {
    return new Promise<IBatch|null>((resolve,reject)=>{
        models.Batch.create({
            name: newBatch.name
        }).then((batch:IBatch)=>{
            getCoursesById(batchId).then((course:any)=>{
                course.addBatch(batch)
                resolve(batch)
            })
        })
    })
}

