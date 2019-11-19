#!/usr/bin/env bash

firebase use alice-1555232535074;

firebase deploy --only functions;
