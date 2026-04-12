import { Link } from "react-router-dom";
import { Button } from "@/shared/ui";

interface ProductRowActionsProps {
  productId: string;
  onDelete: (productId: string) => void;
}

export function ProductRowActions({
  productId,
  onDelete,
}: ProductRowActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Link to={`/admin/edit/${productId}`}>
        <Button variant="secondary" size="sm">
          Edit
        </Button>
      </Link>
      <Button variant="danger" size="sm" onClick={() => onDelete(productId)}>
        Delete
      </Button>
    </div>
  );
}
