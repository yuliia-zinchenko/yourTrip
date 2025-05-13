// import { createApi } from "@reduxjs/toolkit/query/react";
// import { customBaseQuery } from "./locationsApi";

// export const ticketsApi = createApi({
//   reducerPath: "ticketsApi",
//   baseQuery: customBaseQuery,
//   endpoints: (builder) => ({
//     getTickets: builder.query({
//       query: ({ origin, destination, date, travellers }) => ({
//         url: "shopping/flight-offers",
//         params: {
//           originLocationCode: origin,
//           destinationLocationCode: destination,
//           departureDate: date,
//           adults: travellers,
//         },
//       }),
//     }),
//   }),
// });

// export const { useGetTicketsQuery } = ticketsApi;
