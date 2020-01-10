/* eslint-disable import/prefer-default-export */
import axios from "axios";

export class IPFSApiClient {
  constructor(ipfsUrl) {
    this.baseUrl = ipfsUrl;
  }

  get ipfsUrl() {
    return this.baseUrl;
  }

  async addString(data) {
    const bodyFormData = new FormData();
    bodyFormData.set('file', data)
    const res = await axios.post(`${this.baseUrl}/add`, bodyFormData);
    return res.data.Hash;
  }

  async pinHash(hash) {
    const bodyFormData = new FormData();
    bodyFormData.set('path', hash)
    await axios.post(`${this.baseUrl}/pin/add`, bodyFormData)
  }

  async addAndPinString(data) {
    const hash = await this.addString(data);
    await this.pinHash(hash);
    return hash;
  }
}
