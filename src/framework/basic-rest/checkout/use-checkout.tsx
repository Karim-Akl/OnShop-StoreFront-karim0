import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useCart } from "@contexts/cart/cart.context";
import { useMutation } from "@tanstack/react-query";
import { CheckoutInputType, OrderResponse } from "src/types/Checkout";
import { BASE_URL } from "@utils/constants";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
async function checkout(input: any) {
  return http.post(`${BASE_URL}${API_ENDPOINTS.CHECKOUT}`, input);
  // return input;
}
export const useCheckoutMutation = () => {
  const { items, resetCart } = useCart();
  const router = useRouter();
  return useMutation({
    mutationFn: (input: CheckoutInputType) => {
      console.log("🚀 ~ useCheckoutMutation ~ input:", input);

      const body = {
        store_id: 1,
        first_name: input.firstName,
        last_name: input.lastName,
        email: input.email,
        password: "12345678",
        phone: input.phone,
        street: input.streetAddress,
        city: input.city,
        state: input.state,
        gender: "male",
        country: "kw",
        items: items.map((item) => ({
          shop_product_id: item.id,
          qty: item.quantity,
        })),
      };

      return checkout(body);
    },
    onSuccess: ({
      data,
    }: AxiosResponse<{ data: OrderResponse } | AxiosError>) => {
      // @ts-ignore
      if (Boolean(data?.code) && !`${data?.code}`.startsWith("20")) {
        // @ts-ignore
        throw new Error(data?.message ?? "Server Error .");
      } else {
        // @ts-ignore
        localStorage.setItem("order", JSON.stringify(data.data));
        toast.success("Order placed successfully");
        resetCart();
        router.push(ROUTES.ORDER);
      }
      console.log(data, "Checkout success response");
    },
    onError: (error: AxiosError) => {
      console.log(error, "Checkout error response");
      // @ts-ignore
      if (error?.response?.data?.message) toast(error.response?.data?.message!);
      else if (error?.message) toast(error.message!);
      else toast("please try again latter , or contact support .");
    },
  });
};
