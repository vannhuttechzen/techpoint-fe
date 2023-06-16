<template>
    <Preview>
        <Modal :show="superlargeModalSizePreview">
            <a @click="superlargeModalSizePreview = false" class="absolute right-0 top-0 mr-2" href="javascript:;">
                <XIcon class="w-8 h-8 text-slate-400" />
            </a>
            <ModalBody class="text-center m-custom content pt-10 pr-10 pl-10 pb-5">
                <Form @submit="create_user" :validation-schema="schema" v-slot="{ errors }">
                    <div class="intro-y mx-auto w-11/12 p-3 box">
                        <div class="flex flex-row justify-center gap-5 pl-5 pr-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">{{ $t('lang.REWARD.RW24') }}:</label>
                                <Field type="text" name="name" class="form-control pr-10"  :class="{ 'is-invalid': errors.name }" v-model="dataCreate.name" :placeholder="$t('lang.CHECKIN.CK18')"/>
                                <div class="invalid-feedback">{{ errors.name }}</div>
                            </div>
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">Email:</label>
                                <Field type="email" name="email" class="form-control pr-10"  :class="{ 'is-invalid': errors.email }" v-model="dataCreate.email" :placeholder="$t('lang.CHECKIN.CK19')"/>
                                <div class="invalid-feedback">{{ errors.email }}</div>
                            </div>
                        </div>

                        <div class="flex flex-row justify-center gap-5 pl-5 pr-5 mt-5 form-create">
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base"> {{ $t('lang.LOGIN.LG2') }}:</label>
                                <Field type="password" name="password" class="form-control pr-10"  :class="{ 'is-invalid': errors.password }" v-model="dataCreate.password" :placeholder="$t('lang.CHECKIN.CK20')"/>
                                <div class="invalid-feedback">{{ errors.password }}</div>
                            </div>
                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">{{ $t('lang.REWARD.RW23') }}:</label>
                                <Field as="select" name="organization" class="form-select"  :class="{ 'is-invalid': errors.organization }" v-model="dataCreate.organization">
                                    <option v-for="(item, index) in result_organization" :key="index" :value="item.id">{{ item.organizationName }}</option>
                                </Field>
                                <div class="invalid-feedback">{{ errors.organization }}</div>
                            </div>
                        </div>

                        <div class="flex justify-start gap-5 pl-5 pr-5 mt-5 form-create">

                            <div class="w-1/2 create-layout">
                                <label for="regular-form-1" class="form-label text-base">{{ $t('lang.SIDEBAR.UM1') }}:</label>
                                <Field as="select" name="role" class="form-select"  :class="{ 'is-invalid': errors.role }" v-model="dataCreate.roleId">
                                    <option v-for="(item, index) in result_decentralization" :key="index" :value="item.id">{{ item.name }}</option>
                                </Field>
                                <div class="invalid-feedback">{{ errors.role }}</div>
                            </div>
                        </div>

                        <div class="intro-x mt-4 mx-auto text-center">
                            <button class="btn btn-secondary w-24 mr-4 mb-2" @click="gotoListUser">{{ $t('lang.REWARD.RW21') }}</button>
                            <button class="btn btn-primary w-24 mb-2" type="submit" >{{ $t('lang.REWARD.RW54') }}</button>
                        </div>
                    </div>
                </Form>

            </ModalBody>
        </Modal>
    </Preview>
</template>

<script>
export default {
    name: "Form"
}
</script>

<style scoped>

</style>