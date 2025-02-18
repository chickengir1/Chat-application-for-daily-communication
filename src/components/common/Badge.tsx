import DefaultBadge from "../../../public/assets/images/default_badge.svg";

export interface BadgeProps {
  size: string;
  src?: string;
}

const Badge = ({ size = "60px", src = DefaultBadge }: BadgeProps) => {
  const resolvedSize = /^\d+$/.test(size) ? `${size}px` : size; // 단위 확인 및 추가

  return (
    <div
      className="rounded-full"
      style={{ width: resolvedSize, height: resolvedSize }}
    >
      <img
        src={src}
        alt="뱃지 이미지"
        className="h-[100%] w-[100%] object-cover"
      />
    </div>
  );
};

export default Badge;
