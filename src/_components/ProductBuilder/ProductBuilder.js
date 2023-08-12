import React from 'react'
import './ProductBuilder.scss'
import { useForm } from 'react-hook-form'
import { createURL, fetchWrapper } from '../../_helpers/fetch-wrapper';
import { DateTime } from 'luxon';
import { useLoaderData } from 'react-router-dom';

export default function ProductBuilder() {
    const product = useLoaderData()
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { ...product } })
    const onSubmit = product => {
        product.joined_at = DateTime.fromJSDate(product.joined_at).toISO()
        product.delivered_at = DateTime.fromJSDate(product.delivered_at).toISO()
        if (product.port_or_vault === 'port') {
            product.port = product.port_or_vault_number
        } else {
            product.vault = product.port_or_vault_number
        }
        fetchWrapper.post(createURL('products'), product)
            .catch(error => {
                alert(error.message)
            })
    }

    const errorMessages = {
        "guide_number-required": "Guide number required",
        "guide_number-pattern": "Guide number invalid",
        "quantity-required": "Quantity required",
        "port_or_vault-required": "Port or vault required",
        "port_or_vault_number-required": "Number required",
        "shipping_price-required": "Shipping price required",
        "vehicle_plate-required": "Vehicle plate required",
        "vehicle_plate-pattern": "Vehicle plate invalid",
        "joined_at-required": "Joined at required",
        "delivered_at-required": "Delivered at required",
    }
    const errorsHandler = (n, t) => {
        const errorAlertText = errorMessages[`${n}-${t}`]
        return errorAlertText && <p role="alert" className="sign-in-form__input-error">{errorAlertText}</p>
    }

    return (
        <form className="product-builder" onSubmit={handleSubmit(onSubmit)}>
            <p className="product-builder__title">New product</p>
            <input type="text" className="product-builder__input" placeholder='Guide number' maxLength={10}
                {...register("guide_number", { required: true, pattern: /^[A-Za-z0-9]{10}$/ })} />
            {errorsHandler("guide_number", errors.guide_number?.type)}

            <input type="number" className="product-builder__input" placeholder='Quantity' min={0}
                {...register("quantity", { required: true, min: 0, valueAsNumber: true })} />
            {errorsHandler("quantity", errors.quantity?.type)}

            <label>Type
                <select name="type" className="product-builder__input" {...register("type")}>
                    <option value="" disabled selected>Select your option</option>
                    <option value="type_1">1</option>
                    <option value="type_2">2</option>
                    <option value="type_3">3</option>
                    <option value="type_4">4</option>
                    <option value="type_5">5</option>
                </select>
            </label>

            <label>Port or Vault
                <select name="port_or_vault" className="product-builder__input" {...register("port_or_vault")}>
                    <option value="" disabled selected>Select your option</option>
                    <option value="port">Port</option>
                    <option value="vault">Vault</option>
                </select>
            </label>
            {errorsHandler("port_or_vault", errors.port_or_vault?.type)}

            <input type="number" className="product-builder__input" placeholder='Number' min={0}
                {...register("port_or_vault_number", { required: true, min: 0, valueAsNumber: true })} />
            {errorsHandler("port_or_vault_number", errors.port_or_vault_number?.type)}

            <input type="number" className="product-builder__input" placeholder='Shipping Price'
                {...register("shipping_price", { required: true, valueAsNumber: true })} />
            {errorsHandler("shipping_price", errors.shipping_price?.type)}

            <input type="text" className="product-builder__input" placeholder='Vehicle plate' maxLength={7}
                {...register("vehicle_plate", { required: true, pattern: /^[A-Za-z]{3}-[0-9]{3}$/ })} />
            {errorsHandler("vehicle_plate", errors.vehicle_plate?.type)}


            <label>Joined At
                <input type="datetime-local" className="product-builder__input"
                    {...register("joined_at", { required: true, maxLength: 255, valueAsDate: true })} />
                {errorsHandler("joined_at", errors.joined_at?.type)}
            </label>

            <label>Delivered At
                <input type="datetime-local" className="product-builder__input"
                    {...register("delivered_at", { required: true, maxLength: 255, valueAsDate: true })} />
                {errorsHandler("delivered_at", errors.delivered_at?.type)}
            </label>

            <button className="product-builder__submit">Submit</button>
        </form>
    )
}