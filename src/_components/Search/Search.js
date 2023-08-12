import React from 'react'
import './Search.scss'
import { createURL, fetchWrapper } from '../../_helpers/fetch-wrapper'
import { useForm } from 'react-hook-form'
import { DateTime } from 'luxon'

export default function Search({ className, setProducts }) {
    const onSubmit = search => {
        fetchWrapper.get(createURL('search', search))
            .then(products => {
                setProducts(products)
            })
            .catch(error => alert(error))
    }
    const { register, handleSubmit, formState: { errors } } = useForm()
    const errorMessages = {
        "guide_number-pattern": "Guide number invalid",
        "vehicle_plate-pattern": "Vehicle plate invalid",
    }
    const errorsHandler = (n, t) => {
        const errorAlertText = errorMessages[`${n}-${t}`]
        return errorAlertText && <p role="alert" className="sign-in-form__input-error">{errorAlertText}</p>
    }
    return (
        <form className={"search " + className} onSubmit={handleSubmit(onSubmit)}>
            <button className="search__submit"><i className="bx bx-search"></i></button>

            <input type="text" className="search__input" placeholder='Guide number' maxLength={10}
                {...register("guideNumber", { pattern: /^[A-Za-z0-9]{10}$/ })} />
            {errorsHandler("guideNumber", errors.guideNumber?.type)}

            <input type="text" className="search__input" placeholder='Vehicle plate' maxLength={7}
                {...register("vehiclePlate", { pattern: /^[A-Za-z]{3}-[0-9]{3}$/ })} />
            {errorsHandler("vehiclePlate", errors.vehiclePlate?.type)}

            <label>Type
                <select name="type" className="search__input" {...register("type")}>
                    <option value="" disabled selected>Select your option</option>
                    <option value="type_1">1</option>
                    <option value="type_2">2</option>
                    <option value="type_3">3</option>
                    <option value="type_4">4</option>
                    <option value="type_5">5</option>
                </select>
            </label>

            <input type="number" className="search__input" placeholder='Port' min={0}
                {...register("port", { min: 0, setValueAs: v => v === '' ? '' : parseInt(v) })} />
            {errorsHandler("port", errors.port?.type)}

            <input type="number" className="search__input" placeholder='Vault' min={0}
                {...register("vault", { min: 0, setValueAs: v => v === '' ? '' : parseInt(v) })} />
            {errorsHandler("vault", errors.vault?.type)}

            <div className="search__input-range">
                Shipping Price
                <input type="number" className="search__input search__input--range" placeholder='Start'
                    {...register("startPrice", { setValueAs: v => v === '' ? '' : parseInt(v) })} />
                {errorsHandler("startPrice", errors.startPrice?.type)}

                <input type="number" className="search__input search__input--range" placeholder='End'
                    {...register("endPrice", { setValueAs: v => v === '' ? '' : parseInt(v) })} />
                {errorsHandler("endPrice", errors.endPrice?.type)}
            </div>

            <div className="search__input-range">
                Quantity
                <input type="number" className="search__input search__input--range" placeholder='Start'
                    {...register("startQuantity", { setValueAs: v => v === '' ? '' : parseInt(v) })} />
                {errorsHandler("startQuantity", errors.startQuantity?.type)}

                <input type="number" className="search__input search__input--range" placeholder='End'
                    {...register("endQuantity", { setValueAs: v => v === '' ? '' : parseInt(v) })} />
                {errorsHandler("endQuantity", errors.endQuantity?.type)}
            </div>

            <div className="search__input-range">
                Joined At
                <input type="datetime-local" className="search__input"
                    {...register("startJoinedAt", { setValueAs: v => v === '' ? '' : DateTime.fromFormat(v, "yyyy-LL-dd'T'H:mm").toISO() })} />
                {errorsHandler("startJoinedAt", errors.startJoinedAt?.type)}

                <input type="datetime-local" className="search__input search__input--range"
                    {...register("endJoinedAt", { setValueAs: v => v === '' ? '' : DateTime.fromFormat(v, "yyyy-LL-dd'T'H:mm").toISO() })} />
                {errorsHandler("endJoinedAt", errors.endJoinedAt?.type)}
            </div>

            <div className="search__input-range">
                Delivered at
                <input type="datetime-local" className="search__input"
                    {...register("startDeliveredAt", { setValueAs: v => v === '' ? '' : DateTime.fromFormat(v, "yyyy-LL-dd'T'H:mm").toISO() })} />
                {errorsHandler("startDeliveredAt", errors.startDeliveredAt?.type)}

                <input type="datetime-local" className="search__input search__input--range"
                    {...register("endDeliveredAt", { setValueAs: v => v === '' ? '' : DateTime.fromFormat(v, "yyyy-LL-dd'T'H:mm").toISO() })} />
                {errorsHandler("endDeliveredAt", errors.endDeliveredAt?.type)}
            </div>
        </form>
    )
}