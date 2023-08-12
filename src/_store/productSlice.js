import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createURL, fetchWrapper } from '../_helpers/fetch-wrapper'

const extraActions = createExtraActions()
const slice = createSlice({
    name: "product",
    initialState: createInitialState(),
    extraReducers: createExtraReducers(),
})
function createInitialState() {
    return {
        products: [],
        product: {},
        status: 'idle'
    }
}

function createExtraActions() {
    return {
        add: addProduct(),
        getAll: getAllProduct(),
        getOne: getOne(),
        update: updateProduct(),
        delete: deleteProduct(),
    }

    function addProduct() {
        return createAsyncThunk(
            'product/add',
            async product =>
                await fetchWrapper.post(createURL('product'), product)
        )
    }

    function getAllProduct() {
        return createAsyncThunk(
            'product/getAll',
            async () =>
                await fetchWrapper.get(createURL('product'))
        )
    }

    function getOne() {
        return createAsyncThunk(
            'product/getOne',
            async id =>
                await fetchWrapper.get(createURL('product/' + id))
        )
    }

    function updateProduct() {
        return createAsyncThunk(
            'product/update',
            async product =>
                await fetchWrapper.put(createURL('product' + (product.id ? '/' + product.id : '')), product)
        )
    }
    function deleteProduct() {
        return createAsyncThunk(
            'product/delete',
            async id => {
                await fetchWrapper.delete(createURL('product/' + id))
            }
        )
    }
}
function createExtraReducers() {
    return {
        ...addProduct(),
        ...getAllProduct(),
        ...getOne(),
        ...updateProduct(),
        ...deleteProduct(),
    }

    function getAllProduct() {
        var { pending, fulfilled, rejected } = extraActions.getAll
        return {
            [pending]: state => {
                state.status = 'loading'
            },
            [fulfilled]: (state, action) => {
                state.status = 'completed'
                state.products = action.payload
            },
            [rejected]: state => {
                state.status = 'failed'
            }
        }
    }
    function getOne() {
        var { pending, fulfilled, rejected } = extraActions.getOne
        return {
            [pending]: state => {
                state.status = 'loading'
            },
            [fulfilled]: (state, action) => {
                state.status = 'completed'
                state.product = action.payload
            },
            [rejected]: state => {
                state.status = 'failed'
            }
        }
    }

    function addProduct() {
        var { pending, fulfilled, rejected } = extraActions.add
        return {
            [pending]: state => {
                state.status = 'loading'
            },
            [fulfilled]: (state, action) => {
                state.status = 'completed'
                state.products.push(action.payload)
            },
            [rejected]: state => {
                state.status = 'failed'
            }
        }
    }

    function updateProduct() {
        var { pending, fulfilled, rejected } = extraActions.update
        return {
            [pending]: state => {
                state.status = 'loading'
            },
            [fulfilled]: state => {
                state.status = 'completed'
            },
            [rejected]: state => {
                state.status = 'failed'
            }
        }
    }
    function deleteProduct() {
        var { pending, fulfilled, rejected } = extraActions.delete
        return {
            [pending]: state => {
                state.status = 'loading'
            },
            [fulfilled]: state => {
                state.status = 'completed'
            },
            [rejected]: state => {
                state.status = 'failed'
            }
        }
    }
}

export const productActions = { ...slice.actions, ...extraActions }
export const productReducer = slice.reducer