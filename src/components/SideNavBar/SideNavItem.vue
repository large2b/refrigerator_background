<template>
    <div class="side-nav-item">
        <router-link :to="item.path">
            <div class="text" :class="[isActive?'active':'']">
                {{ item.text }}
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        props:{
            item:{
                type:Object
            },
            _isActive:{
                type: Boolean
            }
        },
        data(){
            return {
                isActive:this._isActive
            }
        },
        watch:{
            _isActive(){
                this.isActive = this._isActive
            }
        }
    }
</script>

<style scoped>
    
</style>