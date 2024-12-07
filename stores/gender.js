import {api} from "~/api/index.js";

export const useGenderStore = defineStore('gender', () => {
    const genders = ref([]);
    const fetchgenders = async () => {
        const res = await api.get('/genders');
        genders.value = res.data.genders;
    }
    fetchgenders();

    return{
        genders,
        fetchgenders,
    };
})