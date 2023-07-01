<script setup lang="ts">
import { ref } from 'vue';
import { useAuthenicationStore } from '../stores/authenication'
const auth = useAuthenicationStore();



</script>

<template>
    <va-navbar color="primary" class="mb-3">
        <template #left>
            <va-navbar-item class="logo">
                LOGO
            </va-navbar-item>
        </template>
        <template #right>
            <va-navbar-item>Dashboard</va-navbar-item>
            <va-navbar-item>Reports</va-navbar-item>
            <va-navbar-item>Users</va-navbar-item>
            <va-navbar-item>
                <va-icon name="mdi-magnify" color="textInverted" />
            </va-navbar-item>
            <va-navbar-item>
                <va-icon name="mdi-account-circle-outline" color="textInverted" />
            </va-navbar-item>
        </template>
    </va-navbar>

    <va-navbar color="warning" class="mb-3">
        <template #left>
            <va-navbar-item class="logo">
                LOGO
            </va-navbar-item>
        </template>
        <template #right>
            <va-navbar-item><va-button>Dashboard</va-button></va-navbar-item>
            <va-navbar-item>Reports</va-navbar-item>
            <va-navbar-item>Users</va-navbar-item>
            <va-navbar-item>
                <va-icon name="mdi-magnify" />
            </va-navbar-item>
            <va-navbar-item>
                <va-icon name="mdi-account-circle-outline" />
            </va-navbar-item>
        </template>
    </va-navbar>
</template>

<style></style>
