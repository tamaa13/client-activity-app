import { create } from 'zustand';
import axios from "axios";
import Swal from 'sweetalert2';
const URL = process.env.NEXT_PUBLIC_API_URL

type State = {
  activityData: any
  setActivityData: (activityData: any[]) => void;
  id: number[]
  setId: (id: number[]) => void;
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  projectData: any[]
  setProjectData: (value: any) => void
  toogle: boolean
  setToogle: (value: boolean) => void
  toogleKegiatan: boolean
  setToogleKegiatan: (value: boolean) => void
  idEditActivity: number
  setIdEditActivity: (value: number) => void
  activityDataById: any
  setActivityDataById: (value: any) => void
  projectDataById: any
  setProjectDataById: (value: any) => void
  selectedFilters: string[]
  setSelectedFilters: (value: string[]) => void
  page: number
  setPage: (value: number) => void

  fetchActivity: (access_token: any, page: number, activity: string, projectIds: number[]) => Promise<void>;
  fetchProject: (access_token: any) => Promise<void>;
  fetchDeleteActivity: (access_token: any, id: number) => Promise<void>;
  fetchEditActivity: (access_token: any, id: number, data: any) => Promise<void>;
  fetchActivityById: (access_token: any, id: number) => Promise<void>;
  fetchRegister: (url: any, data: any) => Promise<void>;
};

const useStore = create<State>((set: any) => ({
  activityData: [],
  setActivityData: (activityData: any[]) => set({ activityData }),
  id: [],
  setId: (id: number[]) => set({ id }),
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  projectData: [],
  setProjectData: (projectData: any) => set({ projectData }),
  toogle: false,
  setToogle: (toogle: boolean) => set({ toogle }),
  toogleKegiatan: false,
  setToogleKegiatan: (toogleKegiatan: boolean) => set({ toogleKegiatan }),
  idEditActivity: 0,
  setIdEditActivity: (idEditActivity: number) => set({ idEditActivity }),
  activityDataById: {
    tanggalMulai: '',
    tanggalBerakhir: '',
    waktuMulai: '',
    waktuBerakhir: '',
    activity: '',
    projectId: 0,
  },
  setActivityDataById: (activityDataById: any) => set({ activityDataById }),
  projectDataById: {
    project: ''
  },
  setProjectDataById: (projectDataById: any) => set({ projectDataById }),
  selectedFilters: [],
  setSelectedFilters: (selectedFilters: string[]) => set({ selectedFilters }),
  page: 1,
  setPage: (page: number) => set({ page }),


  fetchActivity: async (access_token: any, page: number, activity: string, projectIds: number[]) => {
    try {
      const projectIdStrings = projectIds.map(id => `projectId=${id}`).join('&');
      const { data } = await axios.get(`${URL}activity?page=${page}&activity=${activity}&${projectIdStrings}`, {
        headers: {
          access_token
        }
      });
      set({ activityData: data, loading: false });
    } catch (error) {
      console.log(error)
    }
  },
  fetchProject: async (access_token: any) => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${URL}project`, {
        headers: {
          access_token
        }
      })
      set({ projectData: data })
    } catch (error) {
      console.log(error)
    }
  },

  fetchDeleteActivity: async (access_token: any, id: number) => {
    try {
      const response = await axios.delete(`${URL}activity/${id}`, {
        headers: {
          access_token
        }
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  },

  fetchEditActivity: async (access_token: any, id: number, data: any) => {
    try {
      const response = await axios.put(`${URL}activity/${id}`, data, {
        headers: {
          access_token
        }
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  },

  fetchActivityById: async (access_token: any, id: number) => {
    try {
      const response = await axios.get(`${URL}activity/${id}`, {
        headers: {
          access_token
        }
      });
      const { data } = response;
      const formattedData = {
        ...data,
        tanggalMulai: new Date(data.tanggalMulai).toISOString().split('T')[0],
        tanggalBerakhir: new Date(data.tanggalBerakhir).toISOString().split('T')[0]
      };
      set({ activityDataById: formattedData });
    } catch (error) {
      console.log(error);
    }
  },

  fetchRegister: async (url: any, data: any) => {
    try {
      const response = await axios.post(url, data);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Register Success',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.log(error);
    }
  }

}));

export default useStore;