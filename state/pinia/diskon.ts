import { defineStore } from "pinia";
import axios from "axios";
import type { PersistenceOptions } from "pinia-plugin-persistedstate";

interface DiskonData {
  _id?: string;
  [key: string]: any;
}

export const useDiskonStore = defineStore("diskon", {
  state: () => ({
    apiUrl: "", 
    diskon: [],
    response: {
      status: null as number | null,
      message: null as string | null,
      error: [] as any[],
    },
  }),
  actions: {
    async getDiskon() {
      try {
        const url = `${this.apiUrl}/diskon`;
        const res = await axios.get(url);
        this.diskon = res.data;
        this.response = {
          status: 200,
          message: "Berhasil mengambil data",
          error: [],
        };
      } catch (error: any) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data?.errors || [],
        };
      }
    },
    async sendDiskon(data: DiskonData) {
      try {
        const { id, ...payload } = data;
        let res;
        if (id) {
          const url = `${this.apiUrl}/diskon/${id}`;
          res = await axios.put(url, payload);
        } else {
          const url = `${this.apiUrl}/diskon`;
          res = await axios.post(url, data);
        }
        this.response = {
          status: 200,
          message: res.data.message,
          error: [],
        };
      } catch (error: any) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data?.errors || [],
        };
      }
      return this.response;
    },
    async deleteDiskon(id: any) {
      try {
        const url = `${this.apiUrl}/diskon/${id}`;
        const res = await axios.delete(url);
        this.response = {
          status: 200,
          message: res.data.message,
          error: [],
        };
      } catch (error: any) {
        this.response = {
          status: error.response?.status,
          message: error.message,
          error: error.response?.data?.errors || [],
        };
      }
      return this.response;
    },
  },
  persist: {
    paths: ['apiUrl'],
  } as PersistenceOptions,
});