import Link from "next/link";

function LearnMoreButton(props: any) {
  return (
    <div>
      <Link href="/courses/introduction-to-programming">
        <a>
          <button className="learn-more">
            <span className="circle">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">Learn More</span>
          </button>
        </a>
      </Link>
      <style jsx>
        {`                        
            button.learn-more {
                position: relative;
                display: inline-block;
                cursor: pointer;
                outline: none;
                border: 0;
                vertical-align: middle;
                text-decoration: none;
                background: transparent;
                padding: 0;
                font-size: inherit;
                font-family: inherit;
                width: 12rem;
              height: auto;
            }
            button.learn-more .circle {
              transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
              position: relative;
              display: block;
              margin: 0;
              width: 3rem;
              height: 3rem;
              background: #282936;
              border-radius: 1.625rem;
            }
            button.learn-more .circle .icon {
              transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
              position: absolute;
              top: 0;
              bottom: 0;
              margin: auto;
              background: #fff;
              transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
              left: 0.625rem;
              width: 1.125rem;
              height: 0.125rem;
              background: none;
            }
            button.learn-more .circle .icon.arrow::before {
              position: absolute;
              content: '';
              top: -0.25rem;
              right: 0.0625rem;
              width: 0.625rem;
              height: 0.625rem;
              border-top: 0.125rem solid #fff;
              border-right: 0.125rem solid #fff;
              -webkit-transform: rotate(45deg);
                      transform: rotate(45deg);
            }
            button.learn-more .button-text {
              transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              padding: 0.75rem 0;
              margin: 0 0 0 1.85rem;
              color: #282936;
              font-weight: 700;
              line-height: 1.6;
              text-align: center;
              text-transform: uppercase;
            }
            button:hover .circle {
              width: 100%;
            }
            button:hover .circle .icon.arrow {
              background: #fff;
              -webkit-transform: translate(1rem, 0);
                      transform: translate(1rem, 0);
            }
            button:hover .button-text {
              color: #fff;
            }
            `}
      </style>
    </div>
  )
};

export default LearnMoreButton;