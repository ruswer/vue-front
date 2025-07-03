<template>
  <div class="p-4">
    <Breadcrumb :items="breadcrumbs" />
    <div class="flex flex-col lg:flex-row gap-4 mt-4">
      <div class="w-full lg:w-[30%] bg-white rounded-lg shadow-sm p-4 h-fit">
        <LogoForm :settings="settings" @edit-logo="showLogoModal = true" />
      </div>
      <SettingsTable
        :settings="settings"
        :fields="fields"
        @edit-settings="showSettingsModal = true"
      />
    </div>
    <LogoModal :show="showLogoModal" @close="showLogoModal = false" @logo-change="onLogoChange" @save-logo="saveLogo" />
    <SettingsModal :show="showSettingsModal" :editSettings="editSettings" :fields="fields" @close="showSettingsModal = false" @save-settings="saveSettings" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Breadcrumb from '../../components/Breadcrumb.vue';
import LogoForm from '../../components/settings/LogoForm.vue';
import SettingsTable from '../../components/settings/SettingsTable.vue';
import LogoModal from '../../components/settings/LogoModal.vue';
import SettingsModal from '../../components/settings/SettingsModal.vue';

const breadcrumbs = ref([
  { text: 'Bosh sahifa', to: '/' },
  { text: 'Tizimni sozlash' },
  { text: 'Sozlamalar', to: '/settings', active: true }
]);

const settings = reactive({
  logoUrl: '',
  center_name: "School Management",
  address: "Toshkent sh., Chilonzor t., 1-uy",
  phone: "+998 90 123 45 67",
  email: "example@info.com",
  session: "2",
  language: "Uzbek",
  daily_payment: "30",
  timezone: "Asia/Tashkent (UTC+5)"
});

const editSettings = reactive({ ...settings });
const showLogoModal = ref(false);
const showSettingsModal = ref(false);

const fields = [
  { key: 'center_name', label: "O'quv markazi nomi", type: 'text' },
  { key: 'address', label: "Manzil", type: 'text' },
  { key: 'phone', label: "Telefon raqam", type: 'text' },
  { key: 'email', label: "Email", type: 'email' },
  { key: 'session', label: "Sessiya", type: 'number' },
  { key: 'language', label: "Til", type: 'text' },
  { key: 'daily_payment', label: "Kunlar bo'yicha to'lov", type: 'number' },
  { key: 'timezone', label: "Vaqt mintaqasi", type: 'text' }
];

function onLogoChange(e) {
  const file = e.target.files[0];
  if (file) {
    settings.logoUrl = URL.createObjectURL(file);
  }
  showLogoModal.value = false;
}

function saveLogo() {
  showLogoModal.value = false;
}

function saveSettings() {
  Object.assign(settings, editSettings);
  showSettingsModal.value = false;
}
</script>
