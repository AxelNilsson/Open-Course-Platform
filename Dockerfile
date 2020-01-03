# ------------------------------------------------------------------------------
# Cargo Build Stage
# ------------------------------------------------------------------------------

FROM rust:latest as cargo-build

RUN apt-get update

RUN apt-get install musl-tools -y

RUN rustup target add x86_64-unknown-linux-musl

WORKDIR /usr/src/open_course_platform

COPY Cargo.toml Cargo.toml

RUN mkdir src/

RUN echo "fn main() {println!(\"if you see this, the build broke\")}" > src/main.rs

RUN RUSTFLAGS=-Clinker=musl-gcc cargo build --release --target=x86_64-unknown-linux-musl

RUN rm -f target/x86_64-unknown-linux-musl/release/deps/open_course_platform*

COPY . .

RUN RUSTFLAGS=-Clinker=musl-gcc cargo build --release --target=x86_64-unknown-linux-musl

# ------------------------------------------------------------------------------
# Final Stage
# ------------------------------------------------------------------------------

FROM alpine:latest

RUN addgroup -g 1000 open_course_platform

RUN adduser -D -s /bin/sh -u 1000 -G open_course_platform open_course_platform

WORKDIR /home/open_course_platform/bin/

COPY --from=cargo-build /usr/src/open_course_platform/target/x86_64-unknown-linux-musl/release/open_course_platform .

RUN chown open_course_platform:open_course_platform open_course_platform

USER open_course_platform

CMD ["./open_course_platform"]
