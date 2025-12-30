<script setup>
import AddButton from './AddButton.vue';
import InputBox from './InputBox.vue';
</script>

<template>
    <div class="container">
        <InputBox />
        <AddButton />
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    gap: 1em;
    width: 90%;
    max-width: 1200px;
    margin: 2em auto;
    padding: 1.5em;
    box-shadow: 0 4px 6px var(--shadow), 0 2px 4px var(--shadow);
    border-radius: 8px;
    background-color: var(--container-bg);
    transition: background-color 0.3s, box-shadow 0.3s;
}

@media (max-width: 768px) {
    .container {
        width: 95%;
        padding: 1em;
        gap: 0.75em;
    }
}

@media (max-width: 480px) {
    .container {
        width: 98%;
        padding: 0.75em;
        flex-direction: column;
        gap: 0.5em;
    }
}
</style>