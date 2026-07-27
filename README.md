# Local LLM Agentic Workflow Benchmark

An experiment exploring the trade-offs between model size, inference
speed, and task performance when running local large language models
on constrained hardware.

This project began as way for me to pick the best LLM to use for
agentic coding on my existing hardware. It is a practical exploration
of what it is like to run different local models in an agentic coding
workflow and to identify a reasonable balance between model capability
and responsiveness on older hardware.

## Experiment Overview
I wanted to explore the question:
> How capable does a local LLM need to be to work effectively in an
> agentic coding workflow, and how much speed is sacrificed as models
> get larger?

I was running local LLMs through Ollama and experimenting with coding
agents such as [OpenCode](https://github.com/anomalyco/opencode) and
[aider](https://github.com/Aider-AI/aider). The goal was to find a
model that could reliably work with files and tools while still
providing acceptable response times.

This led to a range of models with different parameter counts, from
very small models that could run quickly to larger models that
required significantly more computation.

## Hardware
The experiment was performed on a Dell Lattitude E640 laptop with the
following specs:

- OS: NixOS 26.11 (Zokor) x86_64
- CPU: Intel(R) Core (TM) i7-260M (4) @ 3.50 GHz
- GPU: Intel 2nd Generation Core Processor Family Integrated Graphics Controller @ 1.30 GHz (Integrated)
- Memory: 7.64 GiB
- Swap: 8.00 GiB
- Inference: Local CPU-based inference through Ollama

Because the hardware is resource-constrained, inference speed was an
important consideration. A model that performs well but takes an hour
to complete a relatively simple coding task may not be practical for
interactive development.

## Methodology
Each model was given the same prompt through aider:
> "Create the frontend for a web app that converts WAV files to MP3."

The task was intentionally simple but broad enough to evaluate several
aspects of an agentic coding workflow, including:
- Understanding a natural-language requirement
- Using tools
- Creating and modifying files
- Structuring a small web project
- Handling user interaction and application states
- Producing a usable prototype

Each model's completion time was recorded. The resulting
implementation was then subjectively evaluated with a rubric covering:
- Core functionality
- UI/UX
- Visual design
- Technical implementation
- Error handling and edge cases
- Completeness

The quality score was independent of completion time. This allowed the
experiment to compare speed and quality as separate dimensions.

The models tested were:
| Model | Parameters | Time (s) | Score |
| --- | --- | --- | --- |
| Qwen 2.5 Coder 0.5B | 0.5 | 54.02 | 5 |
| Qwen 2.5 Coder 1.5B | 1.5 | N/A | 0 |
| Qwen 2.5 Coder 3B | 3	| 419.87 | 46 |
| Qwen 3 8B | 8	| 2,461.35 | 77 |
| Qwen 3.5 0.8B	| 0.8 | N/A | 0 |
| Qwen 3.5 2B | 2 | 554.81 | 69 |
| Qwen 3.5 4B | 4 | 1232.78 | 68 |
| Ministral 3 8B | 8 | 3,603.73	| 84 |

Models that failed to produce a usable result were recorded as N/A for
completion time and received a score of zero.

## Results

![Results scatterplot](/aider-scores-vs-time.png)

The results showed a clear trade-off between quality and inference
time. The highest-scoring model was Ministral 3 8B, with a score of
84. However, it took approximately one hour to complete the task.

In contrast, Qwen 3.5 2B achieved a score of 69 in approximately 9
minutes, making it substantially faster while still producing a
reasonably strong result.

Interestingly, increasing the parameter count did not always result in
a better score. Qwen 3.5 2B scored slightly higher than Qwen 3.5 4B
while taking less than half the time. This demonstrates that parameter
count alone is not a reliable predictor of practical performance.

The experiment also showed that extremely small models were not
necessarily the most useful. Although Qwen 2.5 Coder 0.5B completed
the task relatively quickly, its output was far less capable than
larger models. 

