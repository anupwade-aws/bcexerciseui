<script setup>
import { reactive, computed } from 'vue';
import { useValidator, useValidation } from 'vue-formor';
import axios from "axios";
const state = reactive({
  form: {
    longitude: '',
    latitude: '',
  },
  hospital: [],
  errors: {},
});

const validator = useValidator();

const validation = useValidation(
  [
    [computed(() => state.form.longitude), [validator.required]],
    [computed(() => state.form.latitude), [validator.required]],
  ],
  state.errors,
);

const submit = () => {
  if (validation.validate()) {
    state.hospital = [];
    const data = {
     latitude: Number(state.form.latitude) >= 0 ? `+${state.form.latitude}`:state.form.latitude,
     longitude: Number(state.form.longitude) >= 0 ? `+${state.form.longitude}`:state.form.longitude
    };
    const api = "http://localhost:8000/api";

    axios.post(`${api}/getdata`, { ...data }).then((response) => {
        if(response.data.features && response.data.features.length > 0){
            response.data.features.forEach(x=>{
              state.hospital.push(x.properties.CMNTY_HLTH_SERV_AREA_NAME)
            })
        }else{
          state.hospital.push('Sorry, No Hospital found')
        }
      }).catch((e) => {
        console.log("Error", e);
      });
  }
};
</script>

<template>
  <form>
    <div class="font-bold">Submit your Longitude and Latitude to find Hospitals near you</div>
    <br />
    <div>
      <label for="form-longitude">Longitude&nbsp;:&nbsp;</label>
      <input id="form-longitude" v-model="state.form.longitude" type="text" class="border" />
      <div class="text-red-500">{{ state.errors['form.longitude'] }}</div>
    </div>
    <br />
    <div>
      <label for="form-latitude">Latitude&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</label>
      <input id="form-latitude" v-model="state.form.latitude" type="text" class="border" />
      <div class="text-red-500">{{ state.errors['form.latitude'] }}</div>
    </div>
    <br />
    <div>
      <button
        type="button"
        class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded"
        @click="submit"
      >
        Submit
      </button>
    </div>

    <br />
    <div>
      <div v-for="item in state.hospital" :key="item" class="text-green-500">{{ item }}</div>
    </div>
  </form>
</template>
