#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib'
import { Cognito } from '../lib/Cognito';
import { Infrastructure } from '../lib/CloudPhotoInfrastructure';


let app = new App();
let cloudPhotoInfrastrcuture = new Infrastructure(app,'CloudPhotoInfrastrcuture');
let cogito = new Cognito(cloudPhotoInfrastrcuture);