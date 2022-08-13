#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib'
import { Cognito } from '../lib/Cognito';
import { Infrastructure } from '../lib/CloudPhotoInfrastructure';
import { Network } from '../lib/Network';
import { Database } from '../lib/Database';
import { Lambda } from '../lib/Lambda';


const app = new App();
const cloudPhotoInfrastrcuture = new Infrastructure(app,'CloudPhotoInfrastrcuture');
const cogito = new Cognito(cloudPhotoInfrastrcuture);
const network = new Network(cloudPhotoInfrastrcuture,'CloudPhotoVpcConstuct');
const database = new Database(cloudPhotoInfrastrcuture,'CloudPhotoDatabaseConstrcut',network.DefaultVpc);
const lambda = new Lambda(cloudPhotoInfrastrcuture,'CloudPhotoLambdaConstruct',database.DatabaseCluster)