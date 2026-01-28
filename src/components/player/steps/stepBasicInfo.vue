<script setup>
const model = defineModel()
</script>

<template>
    <q-card-section class="q-gutter-md">

        <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
                <q-input v-model="model.firstName" label="Nombre" filled />
            </div>
            <div class="col-12 col-md-6">
                <q-input v-model="model.lastName" label="Apellido" filled />
            </div>
            <div class="col-12 col-md-6">
                <q-input v-model="model.dni" label="Dni" filled />
            </div>
            <div class="col-12 col-md-6">
                <q-input v-model="model.email" label="Email" filled />
            </div>
            <div class="col-12 col-md-6">
                <q-input v-model="model.phone" label="Teléfono" filled />
            </div>
            <div class="col-12 col-md-6">
                <q-input v-model="model.address" label="Dirección" filled />
            </div>
            <div class="col-12 col-md-6">
                <q-input
                v-model="model.birthDate"
                label="Fecha de nacimiento"
                type="date"
                filled
                />
            </div>
        </div>
    </q-card-section>
</template>
