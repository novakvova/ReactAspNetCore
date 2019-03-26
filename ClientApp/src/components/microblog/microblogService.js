import axios from "axios";

export default class MicroblogService {
    static createNewPost(model) {
        return axios.post('api/Microblog/Create', model)
    };

    static getListData() {
        return axios.get('api/Microblog/Search')
    };
}