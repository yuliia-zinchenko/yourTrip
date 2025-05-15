import styles from "./styled.module.css";
import { ReactComponent as Plane } from "../../icons/airplane_for_ticket.svg";
import { ReactComponent as Line } from "../../icons/line_for_ticket.svg";
import { Actions } from "./Actions";
import { useState } from "react";
import { Pagination } from "../Pagination";

const ITEMS_PER_PAGE = 5;

export const TicketsResults = ({ data, departureName, arrivalName }) => {
  const [page, setPage] = useState(1);

  if (!data || !Array.isArray(data)) return null;

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  function formatDuration(duration) {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
    const matches = duration.match(regex);

    if (!matches) return duration;

    const hours = matches[1] ? `${matches[1]}h` : "";
    const minutes = matches[2] ? ` ${matches[2]}m` : "";

    return (hours + minutes).trim();
  }

  return (
    <>
      {pageItems.map((ticket) => {
        const itinerary = ticket.itineraries[0];
        const segment = itinerary?.segments[0];

        const departureTime = segment?.departure?.at
          ? formatTime(segment.departure.at)
          : "—";
        const departureAirport = segment?.departure?.iataCode || "—";

        const arrivalTime = segment?.arrival?.at
          ? formatTime(segment.arrival.at)
          : "—";
        const arrivalAirport = segment?.arrival?.iataCode || "—";

        const duration = itinerary?.duration || "—";

        const price = ticket.price?.total
          ? `${ticket.price.total} ${ticket.price.currency || ""}`
          : "—";

        return (
          <div key={ticket.id} className={styles.ticketCard}>
            <div className={styles.ticketContent}>
              <div className={styles.ticketHeader}>
                <div className={styles.timeBlock}>
                  <div className={styles.time}>{departureTime}</div>
                  <div className={styles.location}>
                    <div className={styles.city}>{departureAirport}</div>
                    <div className={styles.airport}>
                      {capitalizeFirstLetter(departureName)}
                    </div>
                  </div>
                </div>

                <div className={styles.flightInfo}>
                  <div className={styles.duration}>
                    {formatDuration(duration)}
                  </div>
                  <div className={styles.arrow}>
                    <Line className={styles.line} />
                    <Plane className={styles.plane} />
                  </div>
                  <div className={styles.price}>{price}</div>
                </div>

                <div className={styles.timeBlock}>
                  <div className={styles.time}>{arrivalTime}</div>
                  <div className={styles.location}>
                    <div className={styles.city}>{arrivalAirport}</div>
                    <div className={styles.airport}>
                      {capitalizeFirstLetter(arrivalName)}
                    </div>
                  </div>
                </div>
              </div>
              <Actions />
            </div>
          </div>
        );
      })}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
};
