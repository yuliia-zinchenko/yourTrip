import { useState, useEffect, useMemo } from "react";
import styles from "./styled.module.css";
import { ReactComponent as LocationIcon } from "../../icons/geo-alt-fill.svg";
import { ReactComponent as ArrowIcon } from "../../icons/arrow-right1.svg";
import { Pagination } from "../Pagination";
import clsx from "clsx";
import { useLazyGetHotelDescriptionsQuery } from "../../redux/bookingApi/bookingApi";
import { LittleLoader } from "../Loader/LittleLoader";
import { SaveButton } from "../SaveButton";

const ITEMS_PER_PAGE = 4;

export const HotelsResults = ({
  hotels,
  descriptions: externalDescriptions,
}) => {
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [savedHotels, setSavedHotels] = useState([]);
  const [hotelDescriptions, setHotelDescriptions] = useState({});

  const [getDescriptions, {data: loadedDescriptions = {}, isFetching}] =
      useLazyGetHotelDescriptionsQuery();

  const sortedHotels = useMemo(() => {
    const getPrice = (hotel) =>
        hotel.composite_price_breakdown?.gross_amount?.value ||
        hotel.price?.value ||
        0;
    const getScore = (hotel) => hotel.review_score || 0;

    const sorted = [...hotels];

    switch (sortOption) {
      case "priceLow":
        sorted.sort((a, b) => getPrice(a) - getPrice(b));
        break;
      case "priceHigh":
        sorted.sort((a, b) => getPrice(b) - getPrice(a));
        break;
      case "ratingHigh":
        sorted.sort((a, b) => getScore(b) - getScore(a));
        break;
      default:
        break;
    }

    return sorted;
  }, [hotels, sortOption]);

  const totalPages = useMemo(
      () => Math.ceil(sortedHotels.length / ITEMS_PER_PAGE),
      [sortedHotels]
  );
  const startIndex = useMemo(() => (page - 1) * ITEMS_PER_PAGE, [page]);
  const pageItems = useMemo(() => {
    return sortedHotels.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedHotels, startIndex]);

  useEffect(() => {
    if (!externalDescriptions && pageItems.length > 0) {
      const ids = pageItems.map((h) => h.hotel_id);
      getDescriptions(ids);
    }
  }, [externalDescriptions, pageItems, getDescriptions]);

  useEffect(() => {
    if (loadedDescriptions && Object.keys(loadedDescriptions).length > 0) {
      setHotelDescriptions((prev) => ({...prev, ...loadedDescriptions}));
    }
  }, [loadedDescriptions]);

  const formatPrice = useMemo(() => {
    return (priceData) => {
      if (priceData?.value && priceData?.currency) {
        return new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: priceData.currency,
        }).format(priceData.value);
      }
      if (typeof priceData === "number") {
        return new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "USD",
        }).format(priceData);
      }
      return "Price not specified";
    };
  }, []);

  const toggleSaveHotel = (hotelId) => {
    setSavedHotels((prev) =>
        prev.includes(hotelId)
            ? prev.filter((id) => id !== hotelId)
            : [...prev, hotelId]
    );

    const getImageUrl = (url) => {
      try {
        new URL(url);
        return url;
      } catch {
        return "/default-hotel.jpg";
      }
    };

    if (!hotels || !Array.isArray(hotels)) {
      return <div className={styles.noResults}>Data loading error</div>;
    }

    if (hotels.length === 0) {
      return <div className={styles.noResults}>Nothing found</div>;
    }

    return (
        <div className={styles.resultsWrap}>
          <div className={styles.topBar}>
            <div className={styles.debugInfo}>
              <p>Found: {hotels.length} hotels</p>
              <p>
                Page: {page} of {totalPages}
              </p>
            </div>

            <div className={styles.sortContainer}>
              <label htmlFor="sortSelect" className={styles.sortLabel}>
                Sort by:
              </label>
              <select
                  id="sortSelect"
                  value={sortOption}
                  onChange={(e) => {
                    setSortOption(e.target.value);
                    setPage(1);
                  }}
                  className={styles.sortSelect}
              >
                <option value="default">Default</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="ratingHigh">Rating: High to Low</option>
              </select>
            </div>
          </div>

          <div className={styles.list}>
            {pageItems.map((hotel) => {
              const description = externalDescriptions?.[hotel.hotel_id] ||
                  hotelDescriptions[hotel.hotel_id] || <LittleLoader/>;

              return (
                  <div className={styles.card} key={hotel.hotel_id}>
                    <div className={styles.imgWrap}>
                      <img
                          src={getImageUrl(hotel.main_photo_url)}
                          alt={hotel.hotel_name}
                          className={styles.img}
                          onError={(e) => {
                            e.target.src = "/default-hotel.jpg";
                          }}
                      />
                    </div>
                    <div className={styles.content}>
                      <div className={styles.header}>
                        <h2 className={styles.title}>{hotel.hotel_name}</h2>
                        <div className={styles.locationRow}>
                          <LocationIcon className={styles.locationIcon}/>
                          <span>
                      {[hotel.address, hotel.city, hotel.country_trans]
                          .filter(Boolean)
                          .join(", ")}
                    </span>
                        </div>
                      </div>
                      <div className={styles.description}>
                        {isFetching && !description ? <LittleLoader/> : description}
                      </div>
                      <div className={styles.cardFooter}>
                        <div className={styles.stats}>
                    <span className={styles.score}>
                      <b>{hotel.review_score ?? "N/A"}</b>/10 ⭐
                    </span>
                          <span className={styles.rating}>
                      {hotel.review_nr ?? 0} reviews
                    </span>
                        </div>
                        <div className={styles.bottom}>
                          <div className={styles.actions}>
                            <a
                                href={hotel.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.detailsBtn}
                            >
                              <ArrowIcon className={styles.ArrowIcon}/>
                            </a>
                            <SaveButton
                                className={clsx(styles.saveBtn, {
                                  [styles.saved]: savedHotels.includes(hotel.hotel_id),
                                })}
                                onClick={() => toggleSaveHotel(hotel.hotel_id)}
                                aria-pressed={savedHotels.includes(hotel.hotel_id)}
                            >
                              Save <span className={styles.heart}>♥</span>
                            </SaveButton>
                          </div>
                          <span className={styles.price}>
                      {formatPrice(
                          hotel.composite_price_breakdown?.gross_amount ||
                          hotel.price
                      )}
                    </span>
                        </div>
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>

          <Pagination page={page} totalPages={totalPages} onPageChange={setPage}/>
        </div>
    );
  };
};