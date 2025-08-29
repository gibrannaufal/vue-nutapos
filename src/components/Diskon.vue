<script setup lang="ts">
import diskonHome from '../assets/diskon-home.png'
import chevrondown from '../assets/chevrondown.png'
import emptydiscount from '../assets/emptydiscount.png'
import pencilIcon from '../assets/pencilicon.png'
import { useDiskonStore } from '../../state/pinia/diskon'

import { computed, onMounted, ref, watch } from 'vue'
const isAvailable = ref(false);

const selectedItem = ref('Kopi Anak Bangsa')
const items = [
  { name: 'Diskon Kopi', img: '/images/kopi.png' },
  { name: 'Diskon Roti', img: '/images/roti.png' },
  { name: 'Diskon Snack', img: '/images/snack.png' },
]
const dialog = ref(false)

const store = useDiskonStore()

const discountName = ref('')
const discountValue = ref<number | null>(null)
const discountType = ref('%')
const idDiscount = ref<number | null>(null)
const isSubmitted = ref(false)
const errorNama = ref('')
const errorNilai = ref('')
const isUpdate = ref(false)
const selectedIds = ref<string[]>([])
const isDeleteMode = ref(false)

function openDialog(type: string) {
  discountType.value = type
  dialog.value = true;
  isUpdate.value = false;
}

function setDiscountType(type: string) {
  discountType.value = type
}

interface DiskonItem {
  _id?: string
  nama: string
  nilai: number
  tipe: '%' | 'Rp'
  kategori?: string
}

const diskonData = ref<DiskonItem[]>([])

function editData(item: any) {
  discountName.value = item.nama,
    discountValue.value = item.nilai,
    discountType.value = item.tipe
  dialog.value = true;
  isUpdate.value = true;
  idDiscount.value = item._id;

}

async function simpanDiskon() {
  errorNama.value = ''
  errorNilai.value = ''

  if (!discountName.value) {
    errorNama.value = 'Nama diskon tidak boleh kosong.'

  }

  if (discountValue.value === null || discountValue.value === 0) {
    errorNilai.value = 'Diskon tidak boleh kosong.'
  }
  isSubmitted.value = true;


  if (errorNama.value || errorNilai.value) return


  const payload = {
    id: idDiscount.value ?? null,
    nama: discountName.value,
    nilai: discountValue.value,
    tipe: discountType.value,
    kategori: selectedItem.value,
  }

  const res = await store.sendDiskon(payload)
  if (res.status === 200) {
    triggerAlert(discountName.value + " Berhasil Disimpan")

    dialog.value = false
    discountName.value = ''
    discountValue.value = null
    discountType.value = '%'
    isSubmitted.value = false;
    await store.getDiskon()
    diskonData.value = store.diskon
  }
}

const showAlert = ref(false)
const alertMessage = ref('')

const rulesNamaDiskon = [
  (value: string) => !!value || 'Nama diskon harus diisi.',
  (value: string) => {
    const namaSudahAda = diskonData.value.some(
      item => item.nama.toLowerCase() === value.toLowerCase()
    )
    return !namaSudahAda || 'Nama diskon sudah digunakan.'
  }
]
const rulesJumlahDiskon = [
  (value: string) => !!value || 'Value diskon harus diisi.',
]

async function triggerAlert(message: string) {
  alertMessage.value = message
  showAlert.value = true
  setTimeout(() => {
    showAlert.value = false
  }, 3000)
}

async function hapusFunc() {
  for (const id of selectedIds.value) {
    await store.deleteDiskon(id)
  }

  selectedIds.value = []
  isDeleteMode.value = false

  await store.getDiskon()
  diskonData.value = store.diskon
  isAvailable.value = diskonData.value.length > 0
}


async function toggleSelectAll() {
  if (selectedIds.value.length === diskonData.value.length) {
    selectedIds.value = []
  } else {
    selectedIds.value = diskonData.value.map(item => item._id!)
  }
}

onMounted(async () => {
  await store.getDiskon()

  // Cek apakah ada data diskon
  if (Array.isArray(store.diskon) && store.diskon.length > 0) {
    diskonData.value = store.diskon
    isAvailable.value = true
  }
})

const searchKeyword = ref('')
const filteredDiskon = computed(() =>
  diskonData.value.filter(item =>
    item.nama.toLowerCase().includes(searchKeyword.value.toLowerCase())
  )
)


watch(selectedIds, (val) => {
  isDeleteMode.value = val.length > 0
})

</script>

<template>
  <v-container class="text-center">
    <div v-if="showAlert" class="d-flex justify-content-center w-100">
      <v-alert class="my-4 custom-alert" transition="scale-transition">
        {{ alertMessage }}
      </v-alert>
    </div>

    <div class="d-flex justify-content-between items-center">
      <h1 class="header-diskon">Daftar Diskon</h1>
      <button v-if="isAvailable && !isDeleteMode" class="button-component" @click="dialog = true"> + Tambah
        Diskon</button>
      <div class="d-flex gap-2" v-if="isAvailable && isDeleteMode">
        <button class="button-component" style="background-color: white; border: 1px solid #FF3553; color: #FF3553"
          @click="toggleSelectAll">
          Batalkan</button>
        <button class="button-component" style="background-color: #FF3553; color: white" @click="hapusFunc">
          Hapus</button>
      </div>
    </div>
    <p class="text-description" style="text-align: start; color: #869098">Total Jumlah Diskon : {{ filteredDiskon.length
    }} </p>
    <div class="d-flex w-100 gap-3 align-center search-bar-wrapper">
      <v-text-field v-model="searchKeyword" label="Cari diskon" placeholder="Contoh: Burger Hemat"
        prepend-inner-icon="mdi-magnify" variant="outlined" density="compact" class="search-field" />

      <v-menu>
        <template #activator="{ props }">
          <button v-bind="props" class="btn-dropdown">
            <img :src="diskonHome" alt="Diskon" class="icon-left" />
            <div>{{ selectedItem }}</div>
            <img :src="chevrondown" alt="Chevron" class="icon-right" />
          </button>
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" @click="selectedItem = item.name">
            <v-list-item-avatar>
              <v-img :src="item.img" />
            </v-list-item-avatar>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div class="container-card notAvailable" v-if="!isAvailable">
      <img :src="emptydiscount" alt="empty" class="w-10 h-5" />
      <h2 class="text-medium">Belum Ada Diskon</h2>
      <h2 class="text-description">Silahkan tambah diskon untuk menarik pelanggan dan meningkatkan penjualan.</h2>
      <button class="button-component" @click="openDialog('create')"> + Tambah Diskon</button>
    </div>
    <div class="container-card isAvailable" v-if="isAvailable">
      <v-table class="mt-4 w-100" style="border-radius: 8px; border: 1px solid #ECEDEF;">
        <thead style="background-color: #F9FAFA;">
          <tr>
            <th>
              <v-checkbox :model-value="selectedIds.length === diskonData.length" @click="toggleSelectAll" hide-details
                density="compact" />
            </th>

            <th class="text-left">Nama Diskon</th>
            <th class="text-left">Nilai Diskon</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredDiskon" :key="item._id">
            <td>
              <v-checkbox :model-value="selectedIds.includes(item._id!)" @click="() => {
                isDeleteMode = true;
                const index = selectedIds.indexOf(item._id!)
                if (index > -1) selectedIds.splice(index, 1)
                else selectedIds.push(item._id!)
              }" hide-details density="compact" />
            </td>

            <td>{{ item.nama }}</td>
            <td>
              <span v-if="item.tipe === '%'">{{ item.nilai }}%</span>
              <span v-else>Rp {{ item.nilai.toLocaleString('id-ID') }}</span>
            </td>
            <td>
              <div class="div" @click="editData(item)">
                <img :src="pencilIcon" class="w-10 h-5" />
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card>
        <v-card-title class="text-h6 d-flex justify-content-between">
          <span v-if="isUpdate"> Update Data</span>
          <span v-if="!isUpdate"> Tambah Data</span>
          <div icon @click="dialog = false; isUpdate = false" size="small" variant="text">
            <v-icon>mdi-close</v-icon>
          </div>
        </v-card-title>
        <v-card-text class="w-100">

          <v-text-field v-model="discountName" :rules="rulesNamaDiskon" label="Nama Diskon" class="mb-3"
            placeholder="Misal: Diskon Opening, Diskon Akhir Tahun" variant="outlined" density="compact" />

          <!-- v-model="discountValue" -->
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 12px; width: 100%;">
            <v-text-field v-model="discountValue" :rules="rulesJumlahDiskon" label="Diskon" type="number"
              variant="outlined" density="compact" style="flex: 1;" />

            <div class="discount-toggle">
              <button :class="['button-component', discountType === '%' ? 'active' : 'inactive']"
                @click="setDiscountType('%')">
                %
              </button>
              <button :class="['button-component', discountType === 'Rp' ? 'active' : 'inactive']"
                @click="setDiscountType('Rp')">
                Rp
              </button>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <button class="button-component w-100" @click="simpanDiskon">Simpan</button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.text-medium {
  font-weight: 600;
  font-size: 22px
}

.text-description {
  font-weight: 400;
  font-size: 16px
}



.discount-toggle {
  display: flex;
  flex: 0 0 120px;
  border-radius: 20px;
  overflow: hidden;
}

.discount-toggle button {
  flex: 1;
  height: 40px;
  padding: 0;
  border-radius: 0;
  min-width: unset;
  font-weight: 600;
  border: 1px solid #CDD2D5;
  color: #000;
}

.button-component {
  width: auto;
  height: 40px;
  border-radius: 20px;
  min-width: 164px;
  background-color: #3DAE2F;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 24px;
  padding-left: 24px;
  border: none;
  box-shadow: none;
  outline: 0;
  color: #FFFFFF;
}

.button-component.active {
  background-color: #F0FBEF;
  color: #3DAE2F;
}

.button-component.inactive {
  background-color: white;
  color: #333;
}


.container-card {
  background-color: white;
  border: 1px solid #ECEDEF;
  width: 100%;
  min-height: 500px;
  padding: 16px;
  border-radius: 12px;
}

.container-card.notAvailable {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  gap: 10px;
}

.container-card.isAvailable {
  display: flex;
  justify-content: start;
  align-items: center;
  text-align: start;
  flex-direction: column;
  gap: 10px;
}

.header-diskon {
  font-size: 28px;
  line-height: 42px;
  font-weight: 600;
  color: black;
  text-align: start;
}


.search-bar-wrapper {
  margin-bottom: 16px;
}

.search-field {
  flex: 1;
  max-width: 240px;
  border-radius: 20px;
}


.btn-dropdown {
  width: auto;
  height: 40px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 12px;
  padding-left: 12px;
  border-radius: 12px;
  border: 1px solid #CDD2D5;
  box-shadow: none;
  background-color: white !important;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

}

.btn-dropdown:hover,
.btn-dropdown:focus,
.btn-dropdown:active {
  background-color: white !important;
  color: black !important;
  outline: none;
  box-shadow: none !important;
}

.custom-alert {
  max-width: 300px;
  background-color: #046B5F;
  color: white;
  padding: 14px 16px;
  border-radius: 8px;
  margin-top: 16px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease;
}
</style>
