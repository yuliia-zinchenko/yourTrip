import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const hotelSearchApi = createApi({
    reducerPath: 'hotelSearchApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://192.168.0.103:7271/api/HotelSearch/',
    }),
    endpoints: (builder) => ({
        searchHotels: builder.query({
            query: (params) => {
                const queryParams = {
                    Country: params.Country || '',        // Країна (обов'язковий)
                    City: params.City || '',              // Місто (обов'язковий)
                    HotelName: params.HotelName || null,  // Назва готелю (опціонально)
                    CheckInDate: params.CheckInDate,      // Дата заїзду (обов'язковий)
                    CheckOutDate: params.CheckOutDate,    // Дата виїзду (обов'язковий)
                    Adults: params.adults || 1,
                    Children: params.children || 0,       // К-сть дітей (за замовч. 0)
                    MinPrice: params.MinPrice || null,    // Мін. ціна (опціонально)
                    MaxPrice: params.MaxPrice || null,    // Макс. ціна (опціонально)
                    Rooms: params.Rooms || 1              // К-сть кімнат (за замовч. 1)
                };

                const cleanedParams = Object.fromEntries(
                    Object.entries(queryParams).filter(([_, v]) => v !== null)
                );

                return {
                    url: 'search',
                    method: 'GET',
                    params: cleanedParams
                };
            },
        }),
    }),
});

export const { useLazySearchHotelsQuery } = hotelSearchApi;