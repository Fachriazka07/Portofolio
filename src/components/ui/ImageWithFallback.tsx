import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  priority?: boolean
  webpSrc?: string
  width?: number
  height?: number
}

export function ImageWithFallback(props: ImgProps) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, priority, webpSrc, width, height, ...rest } = props
  const fetchPriorityValue = priority ? "high" : ((rest as any).fetchPriority ?? (rest as any).fetchpriority)
  const finalProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    loading: priority ? "eager" : ((rest as any).loading ?? "lazy"),
    decoding: (rest as any).decoding ?? "async",
    width,
    height,
    ...rest,
  }

  const finalPropsWithFetchPriority = {
    ...finalProps,
    ...(fetchPriorityValue ? { fetchpriority: fetchPriorityValue as any } : {}),
  } as any

  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img src={ERROR_IMG_SRC} alt="Error loading image" {...finalPropsWithFetchPriority} data-original-url={src} />
        </div>
      </div>
    )
  }

  if (webpSrc) {
    return (
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img src={src} alt={alt} className={className} style={style} {...finalPropsWithFetchPriority} onError={handleError} />
      </picture>
    )
  }

  return <img src={src} alt={alt} className={className} style={style} {...finalPropsWithFetchPriority} onError={handleError} />
}
