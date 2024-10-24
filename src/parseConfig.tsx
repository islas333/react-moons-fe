// src/parseConfig.ts
import Parse from 'parse';

const APP_ID = process.env.REACT_APP_PARSE_APP_ID || "";
const JAVASCRIPT_KEY = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY || "";
const SERVER_URL = process.env.REACT_APP_PARSE_SERVER_URL || "";

Parse.initialize(APP_ID, JAVASCRIPT_KEY);
Parse.serverURL = SERVER_URL;

const validateConnection = async () => {
  try {
    await Parse.Cloud.run('ping');
    console.log('Connected to Parse server successfully.');
  } catch (error) {
    console.error('Failed to connect to Parse server:', error);
  }
};

validateConnection();

export default Parse;