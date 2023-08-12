import React, { useEffect } from 'react'
import './Product.scss'
import { useForm } from 'react-hook-form'
import { DateTime } from 'luxon'
import { createURL, fetchWrapper } from '../../_helpers/fetch-wrapper'

export default function Product({ product }) {
    product.port_or_vault = product.port ? 'port' : 'vault'
    product.port_or_vault_number = product.port || product.vault

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { ...product } })
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
    const onSubmit = product => {
        product.joined_at = DateTime.fromJSDate(product.joined_at).toISO()
        product.delivered_at = DateTime.fromJSDate(product.delivered_at).toISO()
        fetchWrapper.put(createURL('products/' + product.id), product)
            .catch(error => {
                alert(error.message)
            })
    }
    const removeProduct = () => {
        fetchWrapper.delete(createURL('products/' + product.id))
            .catch(error => {
                alert(error.message)
            })
    }
    const [isExpanded, setIsExpanded] = React.useState(false)

    return (
        <form className={"product" + (isExpanded ? ' product--expanded' : '')} onSubmit={handleSubmit(onSubmit)}>
            <label className="product__input">Guide number:
                <input type="text" placeholder='Guide number' maxLength={10}
                    {...register("guide_number", { required: true, pattern: /^[A-Za-z0-9]{10}$/ })} />
                {errorsHandler("guide_number", errors.guide_number?.type)}
            </label>
            <label className="product__input">Quantity:
                <input type="number" placeholder='Quantity' min={0}
                    {...register("quantity", { required: true, min: 0, valueAsNumber: true })} />
                {errorsHandler("quantity", errors.quantity?.type)}
            </label>

            {isExpanded &&
                <label className="product__input">Vehicle Plate:
                    <input type="text" placeholder='Vehicle plate' maxLength={7}
                        {...register("vehicle_plate", { required: true, pattern: /^[A-Za-z]{3}-[0-9]{3}$/ })} />
                    {errorsHandler("vehicle_plate", errors.vehicle_plate?.type)}
                </label>
            }

            <label className="product__input">Shipping Price:
                <input type="number" placeholder='Shipping Price' step="0.01"
                    {...register("shipping_price", { required: true, valueAsNumber: true })} />
                {errorsHandler("shipping_price", errors.shipping_price?.type)}
            </label>

            {isExpanded &&
                <label className="product__input">Port or Vault:
                    <select name="port_or_vault" {...register("port_or_vault")}>
                        <option value="" disabled selected>Select your option</option>
                        <option value="port">Port</option>
                        <option value="vault">Vault</option>
                    </select>
                    {errorsHandler("port_or_vault", errors.port_or_vault?.type)}
                </label>
            }
            {isExpanded &&
                <label className="product__input">Number:
                    <input type="number" placeholder='Number' min={0}
                        {...register("port_or_vault_number", { required: true, min: 0, valueAsNumber: true })} />
                    {errorsHandler("port_or_vault_number", errors.port_or_vault_number?.type)}
                </label>
            }

            {isExpanded &&
                <label className="product__input">Type:
                    <select name="type" {...register("type")}>
                        <option value="" disabled selected>Select your option</option>
                        <option value="type_1">1</option>
                        <option value="type_2">2</option>
                        <option value="type_3">3</option>
                        <option value="type_4">4</option>
                        <option value="type_5">5</option>
                    </select>
                </label>
            }
            {(isExpanded && product.discount) &&
                <p className="product__text">Discount {product.discount}</p>
            }

            {isExpanded &&
                <label className="product__input">Delivered At:
                    <input type="datetime-local" className="product__input"
                        {...register("delivered_at", { valueAsDate: true })} />
                    {errorsHandler("delivered_at", errors.delivered_at?.type)}
                </label>
            }
            <label className="product__input">Joined At:
                <input type="datetime-local"
                    {...register("joined_at", { valueAsDate: true })} />
                {errorsHandler("joined_at", errors.joined_at?.type)}
            </label>

            <div>
                <button type='button' className="product__button product__button--expand"
                    onClick={() => setIsExpanded(!isExpanded)}>
                    <i className={"bx " + (isExpanded ? "bx-chevron-up" : 'bx-chevron-down')}></i>
                </button>
                <button type='submit' className="product__button product__button--submit">
                    <i className="bx bx-check"></i>
                </button>
                <button type='button' className="product__button product__button--delete"
                    onClick={() => removeProduct()}>
                    <i className="bx bx-trash"></i>
                </button>
            </div>
        </form>
    )
}