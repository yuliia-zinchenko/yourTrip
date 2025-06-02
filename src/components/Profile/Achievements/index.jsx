import React, { useState, useRef } from "react";
import css from "./styled.module.css";
import { useGetUserAchievementsQuery } from "../../../redux/profile/profileApi";
import { TooltipPortal } from "./TooltripPortal";

export const Achievements = () => {
  const { data: achievements, isLoading } = useGetUserAchievementsQuery();
  const [hoveredId, setHoveredId] = useState(null);
  const [tooltipPos, setTooltipPos] = useState(null);
  const iconRefs = useRef({});

  if (isLoading) return <div>Loading...</div>;
  if (!achievements) return <div>No achievements found</div>;

  const handleMouseEnter = (id) => {
    setHoveredId(id);

    const icon = iconRefs.current[id];
    if (icon) {
      const rect = icon.getBoundingClientRect();

      setTooltipPos({
        top: rect.top - 110,
        left: rect.left + rect.width / 2,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    setTooltipPos(null);
  };

  return (
    <div>
      <h4 className={css.name}>Achievements</h4>
      <div className={css.achievementsBox}>
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={css.achievementItem}
            ref={(el) => (iconRefs.current[ach.id] = el)}
            onMouseEnter={() => handleMouseEnter(ach.id)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={ach.iconUrl}
              alt={ach.title}
              className={css.achievementIcon}
            />
          </div>
        ))}
      </div>

      {hoveredId && tooltipPos && (
        <TooltipPortal position={tooltipPos}>
          <div>
            <strong>
              {achievements.find((a) => a.id === hoveredId).title}
            </strong>
            <br />
            {achievements.find((a) => a.id === hoveredId).description}
          </div>
        </TooltipPortal>
      )}
    </div>
  );
};
