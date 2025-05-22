// redux/bookingApi/bookingApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookingApi = createApi({
    reducerPath: 'bookingApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://192.168.0.103:7271/api/HotelSearch',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSuggestions: builder.query({
            query: (searchTerm) => ({
                url: 'Suggesting',
                params: {
                    name: searchTerm
                },
            }),
            transformResponse: (response) => {
                return response.map(item => ({
                    city: item.city,
                    country: item.country,
                    hotelName: item.hotelName,
                    destType: item.destType || 'city',
                    hotel_id: item.hotel_id
                })).slice(0, 10);
            }
        }),
        getHotels: builder.query({
            query: ({ cityId, checkin, checkout, adults }) => ({
                url: 'Suggestion',
                params: {
                    cityId: cityId,
                    checkInDate: checkin,
                    checkOutDate: checkout,
                    adults: adults
                },
            }),
            transformResponse: (response) => {
                // Додаємо hotel_id до кожного готелю
                return response.map(hotel => ({
                    ...hotel,
                    hotel_id: hotel.hotel_id || hotel.id // Залежно від того, як повертає бекенд
                }));
            }
        }),
        getHotelDescriptions: builder.query({
            query: (hotelIds) => {
                console.log('Sending hotelIds:', hotelIds);
                const params = {};
                hotelIds.forEach((id, index) => {
                    params[`hotelId${index + 1}`] = id;
                });
                return {
                    url: 'describe',
                    params,
                    method: 'GET',
                };
            },
            transformResponse: (response, meta, arg) => {
                const result = {};
                const requestedHotelIds = arg;
                const descriptionsMap = {};
                if (response.hotelDescriptions && Array.isArray(response.hotelDescriptions)) {
                    response.hotelDescriptions.forEach(item => {
                        descriptionsMap[item.hotelId] = item.hotelDescribe;
                    });
                }

                requestedHotelIds.forEach(hotelId => {
                    result[hotelId] = descriptionsMap[hotelId] || "Description missing";
                });

                return result;
            }
        })


    }),
});

export const {
    useGetSuggestionsQuery,
    useLazyGetHotelDescriptionsQuery
} = bookingApi;