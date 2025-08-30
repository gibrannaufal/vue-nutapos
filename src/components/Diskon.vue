<script setup lang="ts">
// import diskonHome from '../assets/diskon-home.png'
import emptydiscount from '../assets/emptydiscount.png'
import pencilIcon from '../assets/pencilicon.png'
import { useDiskonStore } from '../../state/pinia/diskon'

import { computed, onMounted, ref, toRaw } from 'vue'
const isAvailable = ref(false);

const selectedItem = ref('Kopi Anak Bangsa')

const store = useDiskonStore()

const diskonDialog = ref<HTMLElement | null>(null)
const deleteDialog = ref<HTMLElement | null>(null)
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

const searchKeyword = ref('')

const showAlert = ref(false)
const alertMessage = ref('')

const isErrorName = ref(false)
const textErrorName = ref('')

const isErrorValue = ref(false)
const textErrorValue = ref('')

const urlCrud = ref('')

const sortKey = ref('');
const sortOrder = ref('');

function toggleSort(key: string) {
  if (sortKey.value === key) {
    if (sortOrder.value === '') {
      sortOrder.value = 'asc';
    } else if (sortOrder.value === 'asc') {
      sortOrder.value = 'desc';
    } else {
      sortKey.value = '';
      sortOrder.value = '';
    }
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
}

function getSortIcon(key: string) {
  if (sortKey.value !== key || sortOrder.value === '') return 'unfold_more';
  return sortOrder.value === 'asc' ? 'arrow_upward' : 'arrow_downward';
}

function openDialog(type: string) {
  idDiscount.value = null;
  discountType.value = type
  isUpdate.value = false;
  (diskonDialog.value as any)?.show()
}

function openDeleteDialog() {
  // (deleteDialog.value as any)?.show()
  (diskonDialog.value as any)?.close?.()
  setTimeout(() => {
    (deleteDialog.value as any)?.show?.()
  }, 300) 
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
  isUpdate.value = true;
  idDiscount.value = item._id;
  (diskonDialog.value as any)?.show()
}

async function simpanDiskon() {
  errorNama.value = ''
  errorNilai.value = ''

  if (!discountName.value) {
    triggerAlert(discountName.value + "Nama diskon tidak boleh kosong.");
  }

  if (discountValue.value === null || discountValue.value === 0) {
    triggerAlert(discountName.value + "Diskon tidak boleh kosong.");
  }
  isSubmitted.value = true;


  if (errorNama.value || errorNilai.value) {
    (diskonDialog.value as any)?.close()
    return
  }

  const payload = {
    id: idDiscount.value ?? null,
    nama: discountName.value,
    nilai: discountValue.value,
    tipe: discountType.value,
  }

  const res = await store.sendDiskon(payload)
  if (res.status === 200) {
    triggerAlert(discountName.value + " Berhasil Disimpan");

    (diskonDialog.value as any)?.close()
    discountName.value = ''
    discountValue.value = null
    discountType.value = '%'
    isSubmitted.value = false;
    await store.getDiskon()
    diskonData.value = store.diskon
  }
}

async function triggerAlert(message: string) {
  alertMessage.value = message
  showAlert.value = true
  setTimeout(() => {
    showAlert.value = false
  }, 1000)
}

async function hapusFunc() {
  for (const id of selectedIds.value) {
    await store.deleteDiskon(id)
  }
  if (idDiscount.value) {
    await store.deleteDiskon(idDiscount.value)
  }

  idDiscount.value = null;

  selectedIds.value = []
  isDeleteMode.value = false

  await store.getDiskon();
  diskonData.value = store.diskon;
  isAvailable.value = diskonData.value.length > 0;
  (deleteDialog.value as any)?.close?.();
}

async function closeDialog() {
  (diskonDialog.value as any)?.close()
}

function changeUrl() {
  const rawUrl = toRaw(urlCrud.value);

  if (!rawUrl.startsWith("https://")) {
    alert("URL harus diawali dengan https://");
    return;
  }

  store.apiUrl = rawUrl;

  showAlert.value = true;
  alertMessage.value = "Url berhasil disimpan"
}

async function toggleSelectAll() {
  if (selectedIds.value.length === filteredDiskon.value.length) {
    isDeleteMode.value = false;
    selectedIds.value = []
  } else {
    isDeleteMode.value = true;
    selectedIds.value = filteredDiskon.value.map(item => item._id!)
  }
}
async function closeDeleteDialog() {
  selectedIds.value = [];
  (deleteDialog.value as any)?.close()
}

function toggleSelection(id: string) {
  const index = selectedIds.value.indexOf(id);
  if (index === -1) {
    isDeleteMode.value = true;
    selectedIds.value.push(id);
  } else {
    isDeleteMode.value = false;
    selectedIds.value.splice(index, 1);
  }
}

async function onMenuClose() {
  console.log("Menu ditutup");
}
async function openMenu() {
  console.log("Menu ditutup");
  const menu = document.querySelector("#diskonMenu") as HTMLDialogElement;
  if (menu) {
    menu.open = !menu.open;
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

// const filteredDiskon = computed(() =>
//   diskonData.value.filter(item =>
//     item.nama.toLowerCase().includes(searchKeyword.value.toLowerCase())
//   )
// )

const filteredDiskon = computed(() => {
  let result = diskonData.value.filter(item =>
    item.nama.toLowerCase().includes(searchKeyword.value.toLowerCase())
  );

  if (sortKey.value && sortOrder.value) {
    result.sort((a, b) => {
      let valA = sortKey.value === 'nama'
        ? a.nama.toLowerCase()
        : a.nilai;
      let valB = sortKey.value === 'nama'
        ? b.nama.toLowerCase()
        : b.nilai;

      if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return result;
});

function onSearchInput(e: Event) {
  const target = e.target as HTMLInputElement;
  searchKeyword.value = target.value.toString();
}

function validateDiscountName() {
  const namaSudahAda = diskonData.value.some(
    item => item.nama.toLowerCase() === discountName.value.toLowerCase()
  )
  if (!namaSudahAda) {
    textErrorName.value = 'Nama diskon sudah digunakan';
  }

  if (!discountName.value.trim()) {
    isErrorName.value = true;
    textErrorName.value = 'Nama diskon tidak boleh kosong';
  } else {
    isErrorName.value = false;
    textErrorName.value = '';
  }
}

function validateDiscountValue() {
  if (!discountName.value.trim()) {
    isErrorValue.value = true;
    textErrorValue.value = 'Value diskon tidak boleh kosong';
  } else {
    isErrorValue.value = false;
    textErrorValue.value = '';
  }
}

</script>

<template>
  <div class="container-wrapper">
    <md-dialog :open="showAlert" class="custom-alert">
      <div slot="headline"></div>
      <div slot="content">
        {{ alertMessage }}
      </div>
    </md-dialog>

    <div class="d-flex justify-content-between items-center">
      <h1 class="header-diskon">Daftar Diskon</h1>

      <md-filled-button v-if="isAvailable && !isDeleteMode" class="button-component" @click="openDialog('create')">
        <md-icon slot="icon">add</md-icon>
        Tambah Diskon
      </md-filled-button>

      <div class="button-group d-flex gap-2" v-if="isAvailable && isDeleteMode">
        <md-outlined-button class="button-component button-batalkan" @click="selectedIds = []; isDeleteMode = false">
          Batalkan
        </md-outlined-button>

        <md-filled-button class="button-component button-hapus" @click="openDeleteDialog">
          Hapus
        </md-filled-button>
      </div>
    </div>
    <div class="d-flex justify-content-start text-start" v-if="isAvailable">
      <p class="text-description" style="color: #869098">Total Jumlah Diskon : {{
        filteredDiskon.length
        }} </p>
    </div>

    <div class="d-flex w-100 gap-3 align-center search-bar-wrapper">
      <!-- v-model="searchKeyword" -->
      <md-outlined-text-field v-if="isAvailable" @input="onSearchInput" placeholder="Cari diskon" class="md-search-bar"
        type="search">
        <md-icon slot="leading-icon">search</md-icon>
      </md-outlined-text-field>


      <md-filled-button id="menu-button" @click="openMenu" trailing-icon>
        {{ selectedItem }}
        <md-icon slot="icon">expand_more</md-icon>
      </md-filled-button>

      <md-menu id="diskonMenu" anchor="menu-button" @closed="onMenuClose" positioning="popover" class="w-100">
        <div class="d-flex  justify-start flex-column w-auto m-3">
          <md-outlined-text-field @input="(e: any) => urlCrud = e.target.value" label="Api url crudcrud"
            placeholder="Api url crudcrud" class="w-100 mb-4" type="search">
          </md-outlined-text-field>
          <md-filled-button @click="changeUrl" trailing-icon>
            Terapkan
          </md-filled-button>
        </div>
      </md-menu>

    </div>

    <div class="container-card notAvailable" v-if="!isAvailable">
      <img :src="emptydiscount" alt="empty" class="w-10 h-5" />
      <h2 class="text-medium">Belum Ada Diskon</h2>
      <h2 class="text-description">Silahkan tambah diskon untuk menarik pelanggan dan meningkatkan penjualan.</h2>
      <md-filled-button class="button-component" @click="openDialog('create')">
        <md-icon slot="icon">add</md-icon>
        Tambah Diskon
      </md-filled-button>
    </div>
    <div class="isAvailable" v-if="isAvailable">
      <table class="table mt-4 w-100" style=" border: 1px solid #ECEDEF; border-collapse: separate; border-spacing: 0;">
        <thead style="background-color: #F9FAFA;">
          <tr>
            <th style="border-top-left-radius: 8px;">
              <md-checkbox :checked="selectedIds.length === filteredDiskon.length" @change="toggleSelectAll"
                aria-label="Select item"></md-checkbox>
            </th>

            <th class="text-left" @click="toggleSort('nama')">
              Nama Diskon
              <md-icon>{{ getSortIcon('nama') }}</md-icon>
            </th>
            <th class="text-left" @click="toggleSort('nilai')">
              Nilai Diskon
              <md-icon>{{ getSortIcon('nilai') }}</md-icon>

            </th>
            <th style="border-top-right-radius: 8px;"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredDiskon" :key="item._id">
            <td>
              <md-checkbox :checked="selectedIds.includes(item._id!)" @change="toggleSelection(item._id!)"
                aria-label="Select item"></md-checkbox>
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
      </table>
    </div>
    <md-dialog @closed="closeDialog" ref="diskonDialog" class="modalDialog mw-100">

      <div slot="headline">
        <div class="d-flex justify-content-between w-100">
          {{ isUpdate ? 'Update Data' : 'Tambah Data' }}
          <md-icon @click="closeDialog">close</md-icon>
        </div>
      </div>
      <div slot="content" class="d-flex flex-column w-100 wrapper-content ">
        <md-outlined-text-field @input="(e: any) => discountName = e.target.value" :value="discountName"
          label="Nama Diskon" placeholder="Misal: Diskon Opening, Diskon Akhir Tahun" type="text" required class="mb-3"
          @blur="validateDiscountName" :error="isErrorName" :error-text="textErrorName"></md-outlined-text-field>

        <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 12px; width: 100%;">
          <md-outlined-text-field type="number" label="Tipe Diskon" required style="width: 70%;"
            @input="(e: any) => discountValue = e.target.value" :value="discountValue" @blur="validateDiscountValue"
            :error="isErrorValue" :error-text="textErrorValue"></md-outlined-text-field>

          <div class="button-group d-flex">
            <button class="button-icon left-rounded" :class="[, discountType === '%' ? 'filled' : 'outlined']"
              @click="setDiscountType('%')">
              %
            </button>

            <button class="button-icon right-rounded" :class="[discountType === 'Rp' ? 'filled' : 'outlined']"
              @click="setDiscountType('Rp')">
              Rp
            </button>
          </div>
        </div>

      </div>

      <div slot="actions">
        <div class="d-flex justify-content-between w-100">
          <div v-if="isUpdate" style="text-align: start; color:#FF3553 ; cursor:pointer" @click="openDeleteDialog">Hapus
          </div>
          <md-filled-button :class="{ 'w-100': !isUpdate }" @click="simpanDiskon">Simpan</md-filled-button>
        </div>
      </div>
    </md-dialog>

    <md-dialog @closed="closeDeleteDialog" ref="deleteDialog" class="custom-dialog mw-100">
      <div slot="headline">
        <div class="d-flex justify-content-between w-100">
          Hapus Diskon
        </div>
      </div>
      <div slot="content" class="d-flex flex-column w-100 wrapper-content text-black ">
        Apakah Anda yakin ingin menghapus diskon yang dipilih?
        - Diskon yang dihapus tidak bisa dikembalikan lagi.
      </div>

      <div slot="actions">
        <div class="button-group d-flex gap-2">
          <md-outlined-button class="button-component button-batalkan" @click="closeDeleteDialog">
            Batalkan
          </md-outlined-button>

          <md-filled-button class="button-component button-hapus" @click="hapusFunc">
            Hapus
          </md-filled-button>
        </div>
      </div>
    </md-dialog>
  </div>
</template>

<style scoped>
.container-wrapper {
  background-color: white;
  padding: 20px;
}

.text-medium {
  font-weight: 600;
  font-size: 22px
}

.text-description {
  font-weight: 400;
  font-size: 16px
}


.button-batalkan {
  --md-outlined-button-outline-color: #FF3553;
  --md-sys-color-primary: #FF3553;
  --md-sys-color-surface: #FFFFFF;
  font-weight: 500;
}

.button-hapus {
  --md-sys-color-primary: #FF3553;
  --md-sys-color-on-primary: #FFFFFF;
  font-weight: 500;
}

.md-search-bar {
  width: 100%;
  --md-outlined-text-field-container-height: 40px;

  /* Opsional: atur ukuran ikon */
  --md-outlined-text-field-leading-icon-size: 18px;
  /* Tinggi cukup nyaman */
  --md-outlined-text-field-container-shape: 24px;
  /* Rounded lebih bulat */
  --md-outlined-text-field-outline-width: 1px;
  --md-outlined-text-field-outline-color: rgba(0, 0, 0, 0.38);
  --md-outlined-text-field-focus-outline-color: var(--md-sys-color-primary, #6200ee);
  max-width: 240px;

}


.left-rounded {
  border-radius: 20px 0px 0px 20px;
}

.right-rounded {
  border-radius: 0px 20px 20px 0px;
}

.isNonActive {
  --md-filled-button-container-color: white;
  --md-filled-tonal-button-container-shape: 0px;
}

.button-icon {
  width: 80px;
  border: 1px solid #3DAE2F;
  background-color: white;
  padding: 10px;
  color: #3DAE2F;
}

/* .button-icon:hover {
  border: inherit;
  background-color: inherit;
  padding: 10px;
} */

.filled {
  color: white;
  background-color: #3DAE2F;
  border: 0;
}

.outline {
  border: 1px solid #3DAE2F;
  background-color: white;
  color: #3DAE2F;
}

.modalDialog {
  --md-dialog-container-color: white;
  min-width: 40rem;
  min-height: 40%;
}

.wrapper-content {
  min-height: 0;
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
  --md-dialog-container-color: #046B5F;
  --md-dialog-supporting-text-color: white;
  --md-dialog-container-shape: 8px;
  max-width: 300px;
  max-height: 100px;
  margin-top: 16px;
}

.custom-dialog {
  --md-dialog-container-color: white;
  --md-dialog-supporting-text-color: black;
  --md-dialog-container-shape: 8px;
  max-width: 300px;
}
</style>
