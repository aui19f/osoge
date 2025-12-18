import Button from "@/components/forms/Button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-12">
      <figure className="flex flex-col items-center">
        <div className="relative w-full aspect-square">
          <Image
            src="/images/illustration/404_error.png"
            alt="404 Error Illustration"
            fill
          />
        </div>
        <figcaption className="text-sm text-gray-50">
          ({" "}
          <a
            href="https://iconscout.com/illustrations/404-error"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            404 error
          </a>
          {" by "}
          <a
            href="https://iconscout.com/contributors/motionally-studio"
            className="underline"
          >
            MotionAlly Studio
          </a>
          {" on "}
          <a href="https://iconscout.com" className="underline">
            IconScout
          </a>
          )
        </figcaption>
      </figure>
      <div>
        <Link href="/">
          <Button variant="primary">메인 페이지로 돌아가기</Button>
        </Link>
      </div>
    </div>
  );
}
