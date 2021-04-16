import {version} from '../package.json'

export function sayhi(msg){
    console.log(msg);
}

export function create(human) {
    console.log(human);
}

export function getversion() {
    console.log('version:',version);
}